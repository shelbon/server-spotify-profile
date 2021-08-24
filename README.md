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

**`Procfile`** heroku's config file

**`app.json`** describe web app for heroku deployment

# Endpoints:

- **`/spotify/login/`**
- **`/spotify/login/callback/`**: verify use and send access_token and refresh_token

- **`/refresh_token`**: refresh the access_token

# Deploy

## Requirements

- Create an [heroku account](https://signup.heroku.com/login)

- create spotify application with the [spotify dashboard](https://developer.spotify.com/dashboard),tutorial is [there](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app).

Click on [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
