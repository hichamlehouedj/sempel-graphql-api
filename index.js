// Import all dependencies
import express                  from 'express';
import cors                     from "cors";
import rateLimit                from 'express-rate-limit';
import helmet                   from 'helmet';
import expressDefend            from 'express-defend';
// import session                  from 'express-session';

import { createServer }         from 'http';
import { execute, subscribe }   from 'graphql';
import { SubscriptionServer }   from 'subscriptions-transport-ws';;

// Import all files
import apolloServer             from './src/graphql/initApolloServer';
import DB                       from './src/config/DBContact';
import {AuthMiddleware}         from './src/middlewares/auth';
import {schema}                 from './src/graphql';

import { socketServer }         from './src/socket/initSocketServer';
import logger                   from './src/config/logger';

// Init an Express App.
const app = express();
app.use(cors());

// This `app` is the returned value from `express()`.
const httpServer = createServer(app);

// Use your dependencies here
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

app.use(expressDefend.protect({ 
    maxAttempts: 5,                   // (default: 5) number of attempts until "onMaxAttemptsReached" gets triggered
    dropSuspiciousRequest: true,      // respond 403 Forbidden when max attempts count is reached
    consoleLogging: true,             // (default: true) enable console logging
    logFile: 'suspicious.log',        // if specified, express-defend will log it's output here
    onMaxAttemptsReached: function(ipAddress, url){
        console.log('IP address ' + ipAddress + ' is considered to be malicious, URL: ' + url);
    } 
}));

// app.use(session({ 
//     secret: process.env.SECRET, 
//     resave: true, 
//     saveUninitialized: true, 
//     cookie: { maxAge: 3600 * 24 * 7 } 
// }));

// limit each IP to 100 requests per 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100}));

app.use(AuthMiddleware);

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