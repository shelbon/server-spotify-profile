# proxy-spotify-profile

login server of [spotify-profile project](https://github.com/shelbon/spotify-profile)
used for login ,get credentials(access_token and refresh_token) and refresh the access_token

# Build With:

- [Fastify](https://www.fastify.io)
- [Spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)

# Project structure

The project follows a well established pattern within the Fastify community, it has two top level folders, plugins and routes.

The first one contains all the code that should be shared across your entire aplication, the second one contains all the business logic.

```bash
├───plugins
│       README.md
│       sensible.js
│       support.js
│
├───routes
│       login.js
│       README.md
│
└───test
    │   helper.js
    │   utils.test.js
    │
    ├───plugins
    │       support.test.js
    │
    └───routes
            example.test.js
            root.test.js
```

**`fly.toml`** fly.io config file

**`app.json`** describe web app for heroku deployment

# Endpoints:

- **`/spotify/login/`**
- **`/spotify/login/callback/`**: verify use and send access_token and refresh_token

- **`/refresh_token`**: refresh the access_token

# Deploy

## Requirements

- Create an [fly.io account](https://fly.io/app/sign-in)

- create spotify application with the [spotify dashboard](https://developer.spotify.com/dashboard),tutorial is [there](https://developer.spotify.com/documentation/web-api/quick-start/).

- installing the [Fly Cli](https://fly.io/docs/getting-started/installing-flyctl/)

## Steps

- login with the fly cli
``` bash
    flyctl auth login
```    
-  launch the app  on fly to configure the app
 ``` bash
    flyctl launch
 ```
- set the environment variable 
 ``` bash
    flyctl secrets set CLIENT_ID=xxx CLIENT_SECRET=xxxxx REDIRECT_URI=xxxx
    SCOPE="user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative user-follow-read"  
    STATE_KEY=spotify_auth_state
    FRONTEND_URI=xxx
 ```
- deploy the app
 ``` bash
    flyctl  deploy
 ```