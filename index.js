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

import bcrypt from 'bcryptjs';
import { issueAuthToken, serializeUser } from './src/helpers';
import { User } from './src/models';
import { socketServer } from './src/socket/initSocketServer';
const { hash, compare } = bcrypt;


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

Sentry.init({
    dsn: "https://f7992df690d2407baa8da4fe5693867b@o929759.ingest.sentry.io/5878501",
    tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});

setTimeout(() => {
    try { /*foo();*/ } 
    catch (e) { Sentry.captureException(e); } 
    finally { transaction.finish(); }
}, 99);



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
    console.error('Unable to connect to the database:', error);
}


new socketServer(httpServer).connection();

// set port, listen for requests
const PORT = process.env.PORT || 5000;

// Start Server here
httpServer.listen(PORT,() => {
    console.log(`Server is running is http://localhost:${PORT}${apolloServer.graphqlPath}`); 
});