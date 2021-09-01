import lodash from 'lodash';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { gql, makeExecutableSchema } from 'apollo-server';
import {createRateLimitTypeDef} from 'graphql-rate-limit-directive';

import {schemaDirectives} from './directives';

import {typeDefsBox } from './schema';
import {resolversBox } from './resolvers'

const { merge } = lodash;

const typeDefs = gql`
    scalar Date
    directive @date(defaultFormat: String = "dd/mm/yyyy HH:MM:ss") on FIELD_DEFINITION

    type Query @rateLimit {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        _empty: String
    }

    type statusUpdate {
        status: Boolean
    }

    type statusDelete {
        status: Boolean
    }
`;

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) { return new Date(value); },
        serialize(value) { return value.getTime(); },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) { return parseInt(ast.value, 10); }
            return null;
        },
    })
}


export const schema = makeExecutableSchema({
    typeDefs: [ createRateLimitTypeDef(), typeDefs, typeDefsBox ],
    resolvers: merge( resolvers, resolversBox ),
    schemaDirectives: schemaDirectives,
    tracing: true,
    playground: true,
    introspection: true,
    formatError: (err) => {
        if (err.message.startsWith('Database Error: ')) {
            return new Error('Internal server error');
        }

        return err;
    }
});