// Import all dependencies
import express                  from 'express';
import cors                     from "cors";
import rateLimit                from 'express-rate-limit';
import helmet                   from 'helmet';
import cookieParser             from 'cookie-parser';

import { createServer }         from 'http';
import { execute, subscribe }   from 'graphql';
import { SubscriptionServer }   from 'subscriptions-transport-ws';

// Import all files
import apolloServer             from './src/graphql/initApolloServer';
import DB                       from './src/config/DBContact';
import {schema}                 from './src/graphql';

import logger                   from './src/config/logger';
import { express as expressUserAgent } from 'express-useragent';

// Init an Express App.
const app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(cookieParser())

app.use(expressUserAgent());

// This `app` is the returned value from `express()`.
const httpServer = createServer(app);

// Use your dependencies here
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

// limit each IP to 100 requests per 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100}));

apolloServer.start();

apolloServer.applyMiddleware({ app });

const subscriptionServer = SubscriptionServer.create(
    { 
        schema, execute, subscribe,
        onConnect(connectionParams, webSocket, context) {
            console.log('Connected!')
            //console.log({connectionParams, webSocket, context});
        },
        onDisconnect(webSocket, context) {
            console.log('Disconnected!')
        },
    },
    { server: httpServer, path: apolloServer.graphqlPath }
);

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        subscriptionServer.close();
        await apolloServer.stop();
        console.log('Server closed');
        process.exit(0);
    });
});

try {
    DB.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) { 
    logger.error(error)
    console.error('Unable to connect to the database:', error);
}

// set port, listen for requests
const PORT = process.env.PORT || 5000;

// Start Server here
httpServer.listen(PORT,() => {
    logger.info(`Server is running is http://localhost:${PORT}${apolloServer.graphqlPath}`)
    logger.info(`Subscriptions is running is ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
});