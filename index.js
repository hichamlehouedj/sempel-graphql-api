// Import all dependencies
import express                  from 'express';
import cors                     from "cors";
import rateLimit                from 'express-rate-limit';
import * as Sentry              from '@sentry/node';

import { createServer }         from 'http';
import { execute, subscribe }   from 'graphql';
import { SubscriptionServer }   from 'subscriptions-transport-ws';;

// Import all files
import apolloServer             from './src/graphql/initApolloServer';
import DB                       from './src/config/DBContact';
import {AuthMiddleware}         from './src/middlewares/auth';
import {schema}                 from './src/graphql';
import {Box as boxRoutes} from './src/restFul/routes';

import { socketServer } from './src/socket/initSocketServer';
import logger from './src/config/logger'

// Init an Express App.
const app = express();
app.use(cors());

// This `app` is the returned value from `express()`.
const httpServer = createServer(app);

// Use your dependencies here
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// limit each IP to 100 requests per 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100}));

app.use(AuthMiddleware);

app.use('/box', boxRoutes);

apolloServer.start();

apolloServer.applyMiddleware({ app });

const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe, }, 
    { server: httpServer, path: apolloServer.graphqlPath }
);

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => subscriptionServer.close());
});

try {
    DB.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) { 
    logger.error(error)
    console.error('Unable to connect to the database:', error);
}


new socketServer(httpServer).connection();

// set port, listen for requests
const PORT = process.env.PORT || 5000;

// Start Server here
httpServer.listen(PORT,() => {
    logger.info(`Server is running is http://localhost:${PORT}${apolloServer.graphqlPath}`)
    // console.log(`Server is running is http://localhost:${PORT}${apolloServer.graphqlPath}`);
});