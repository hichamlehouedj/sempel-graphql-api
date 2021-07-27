// Import all dependencies
import express                  from 'express';
import cors                     from "cors";
import rateLimit                from 'express-rate-limit';
import * as Sentry              from '@sentry/node';

import { createServer }         from 'http';
import { execute, subscribe }   from 'graphql';
import { SubscriptionServer }   from 'subscriptions-transport-ws';;

import { Server }               from "socket.io";

// Import all files
import apolloServer             from './controler/initApolloServer';
import DB                       from './config/DBContact';
import {AuthMiddleware}         from './middlewares/auth';
import {schema}                 from './controler';

import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import { issueAuthToken, serializeUser } from './helpers';
import { User } from './models';


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


const io = new Server(httpServer, {
    cors: ["http://localhost:5500"]
});

io.on("connection", (socket) => {
    console.log("new user connected", socket.id);

    socket.on("post-data", async (args) => {
        console.log(args); // world
        
        try {

            let user =  await User.findOne({ where: { user_name: args.user_name } });

            
            console.log(user);
            if (user) { return socket.emit("data-respond", 'Username is already Exist.');}

            user =  await User.findOne({ where: { id_person: args.id_person } });

            console.log(user);
            
            if (user) { return socket.emit("data-respond", 'Person is already registred.');}

            // Hash the user password
            let hashPassword = await hash(args.password, 10);
            
            let result = await User.create({
                user_name: args.user_name,
                password: hashPassword,
                role: args.role,
                activation: args.activation,
                id_person: args.id_person
            })

            result = await serializeUser(result);

            let token = await issueAuthToken(result);

            return socket.emit("data-respond", {
                user: result,
                token: token
            });
        } catch (error) {
            return socket.emit("data-respond", error.message);
        }

    });

});

// set port, listen for requests
const PORT = process.env.PORT || 5000;

// Start Server here
httpServer.listen(PORT,() => {
    console.log(`Server is running is http://localhost:${PORT}${apolloServer.graphqlPath}`); 
});