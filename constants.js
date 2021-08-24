const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://spotifile.netlify.app'
    : 'http://localhost:5000';
const DYNO_URL = 'https://server-spotify-profile.herokuapp.com/';
export { ALLOWED_ORIGIN, DYNO_URL };
