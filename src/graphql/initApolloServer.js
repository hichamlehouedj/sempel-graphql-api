// Import all dependencies
import { ApolloServer }                     from 'apollo-server-express';
import depthLimit                           from 'graphql-depth-limit';
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity';
import { GraphQLError }                     from 'graphql';

import {schema}                             from '.';


const queryComplexityRule = queryComplexity({
    maximumComplexity: 1000,
    variables: {},
    // eslint-disable-next-line no-console
    createError: (max, actual) => new GraphQLError(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`),
    estimators: [
        simpleEstimator({
            defaultComplexity: 1,
        }),
    ],
});

const apolloServer = new ApolloServer({ 
    schema,
    validationRules: [ 
        depthLimit(3),
        queryComplexityRule
    ],
    context: ({ req, res }) => {
        let {user, isAuth } = req;
        let refreshToken = req.cookies["___refresh_token"];

        return {
            res,
            req,
            user,
            isAuth,
            refreshToken
        };
    }
});


export default apolloServer;