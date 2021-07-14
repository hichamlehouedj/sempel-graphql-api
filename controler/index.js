import lodash from 'lodash';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { gql, makeExecutableSchema } from 'apollo-server';

import {typeDefsBox, typeDefsClient, typeDefsCompany, typeDefsFactor, typeDefsInvoice, typeDefsPerson, typeDefsUser} from './schema';
import {resolversBox, resolversClient, resolversCompany, resolversInvoice, resolversPerson, resolversUser} from './resolvers'

const { merge } = lodash;


const typeDefs = gql`
    scalar Date
    directive @isAuth on FIELD_DEFINITION

    type Query {
        _empty: String
    }

    type Mutation {
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
    typeDefs: [ typeDefs, typeDefsBox, typeDefsClient, typeDefsCompany, typeDefsFactor, typeDefsInvoice, typeDefsPerson, typeDefsUser ],
    resolvers: merge( resolvers, resolversBox, resolversClient, resolversCompany, resolversInvoice, resolversPerson, resolversUser )
});