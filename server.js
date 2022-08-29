'use strict';

import closeWithGrace from 'close-with-grace';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import appService from './app.js';

dotenv.config();

const app = Fastify({
    logger: true,
});

// Register your application as a normal plugin.

app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
    {delay: 500},
    async function ({signal, err, manual}) {
        if (err) {
            app.log.error(err);
        }
        await app.close();
    },
);

app.addHook('onClose', async (instance, done) => {
    closeListeners.uninstall();
    done();
});
const options = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
}

app.listen(options, (err) => {

    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});