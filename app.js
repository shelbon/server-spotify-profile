'use strict';

import {join} from 'desm';
import AutoLoad from '@fastify/autoload';
import Cookie from '@fastify/cookie';
import Cors from '@fastify/cors';
import Env from '@fastify/env';
import lightrun from 'lightrun';

lightrun.start({
    lightrunSecret: 'c011f943-383c-4509-81e3-38afdaffcab0',
});
export default async function (fastify, opts) {
    const envOption = {
        dotenv: {
            debug: false,
        },
        schema: {
            type: 'object',
            required: [
                'REDIRECT_URI',
                'CLIENT_SECRET',
                'CLIENT_ID',
                'SCOPE',
                'STATE_KEY',
                'FRONTEND_URI'
            ],
            properties: {
                REDIRECT_URI: {
                    type: 'string',
                },
                CLIENT_ID: {
                    type: 'string',
                },
                CLIENT_SECRET: {
                    type: 'string',
                },
                SCOPE: {
                    type: 'string',
                },
                STATE_KEY: {
                    type: 'string',
                },
                FRONTEND_URI: {
                    type: 'string'
                }
            },
        },
    };

    fastify.register(Env, envOption);
    fastify.register(Cookie);

    fastify.register(Cors, {
        credentials: true,
        origin: process.env.FRONTEND_URI,
        methods: ['GET'],
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: join(import.meta.url, 'plugins'),
        options: Object.assign({}, opts),
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: join(import.meta.url, 'routes'),
        options: Object.assign({}, opts),
    });
}