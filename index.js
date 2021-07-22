// Import all dependencies
import express from 'express';
import cors from "cors";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";

import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

import {AuthMiddleware} from './middlewares/auth';
import DB from './config/DBContact';

import {schema} from './controler';
import {schemaDirectives} from './directives';

// Init an Express App.
const app = express();
app.use(cors());

// This `app` is the returned value from `express()`.
const httpServer = createServer(app);

// Use your dependencies here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(AuthMiddleware);

const server = new ApolloServer({ 
    schema,
    plugins: [ApolloServerPluginInlineTrace()],
    context: ({ req }) => {
        let {user, isAuth } = req;
        return {
            req,
            user,
            isAuth
        };
    }
});

await server.start();

server.applyMiddleware({ app });

const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe, }, 
    {server: httpServer, path: server.graphqlPath,}
);

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => subscriptionServer.close());
});

try {
    await DB.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// set port, listen for requests
const PORT = process.env.PORT || 5000;

// Start Server here
httpServer.listen(PORT,() => {
    console.log(`Server is running is http://localhost:${PORT}${server.graphqlPath}`);
});