import SpotifyWebApi from 'spotify-web-api-node';
import { generateRandomString } from '../utils.js';

export default async function (fastify, opts) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });
  
  fastify.get(
    '/spotify/login/',
    function (req, res) {
      const scope = process.env.SCOPE.split(' ');
      const state = generateRandomString(16);

      res.cookie(process.env.STATE_KEY, state);
      let authorizeURL = spotifyApi.createAuthorizeURL(scope, state);
      return res.redirect(authorizeURL);
    }
  );
  // Ask the api the access_token and refresh_token
  fastify.get('/spotify/login/callback/', function (req, res) {
    let { code, state } = req.query;
    const storedState = req.cookies ? req.cookies.spotify_auth_state : null;

    if (state === null || state !== storedState) {
      res.redirect(
        `${process.env.FRONTEND_URI}#${new URLSearchParams({
          error: 'state_mismatch',
        }).toString()}`
      );
    } else {
      res.clearCookie(process.env.STATE_KEY);
      spotifyApi
        .authorizationCodeGrant(code)
        .then(function (data) {
          res.redirect(
            `${process.env.FRONTEND_URI}#${new URLSearchParams({
              access_token: data.body.access_token,
              refresh_token: data.body.refresh_token,
            }).toString()}`
          );
        })
        .catch((error) => {
          fastify.log.error(error.message);
          res.redirect(process.env.FRONTEND_URI);
        });
    }
  });
  fastify.get('/refresh_token', (req, res) => {
    // ♻ Requesting access token again, using refresh token
    const refresh_token = req.query.refresh_token;
    spotifyApi.setRefreshToken(refresh_token);
    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        const access_token = data.body.access_token;
        res.send({ access_token: access_token });
      })

      .catch((e) => {
        fastify.log.error(e.message);
      });
  });
}