import lodash from 'lodash';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { gql, makeExecutableSchema } from 'apollo-server';
import { PubSub, PubSubEngine, withFilter } from 'graphql-subscriptions';

import {schemaDirectives} from '../directives';

import {typeDefsBox, typeDefsClient, typeDefsCompany, typeDefsFactor, typeDefsInvoice, typeDefsPerson, typeDefsUser} from './schema';
import {resolversBox, resolversClient, resolversCompany, resolversInvoice, resolversPerson, resolversUser} from './resolvers'
import { Box } from '../models';

const { merge } = lodash;

const pubsub = new PubSub();

const typeDefs = gql`
    scalar Date

    enum Role {
        ADMIN
        USER
        CLIENT
    }

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        boxCreated(idUser: Int!): Box
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
    }),

    Mutation: {
        createBox: async (obj, args, context, info) => {


            let box = await Box.create({
                status:             args.status,
                name_recipient:     args.name_recipient,
                phon1_recipient:    args.phon1_recipient,
                phon2_recipient:    args.phon2_recipient,
                place_delivery:     args.place_delivery,
                price:              args.price,
                code_order:         args.code_order,
                number_Receipt:     args.number_Receipt,
                note:               args.note,
                id_client:          args.id_client,
                id_user:            args.id_user
            })

            pubsub.publish('BOX_CREATED', { boxCreated: box });
            
            return box;
        }
    },

    Subscription: {
        boxCreated: {
            subscribe: withFilter (
                () => pubsub.asyncIterator('BOX_CREATED'),
                (payload, variables) => {
                    // Only push an update if the comment is on
                    // the correct repository for this operation
                    return (payload.boxCreated.id_user === variables.idUser);
                },
            )
        },
    }
}


export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, typeDefsBox, typeDefsClient, typeDefsCompany, typeDefsFactor, typeDefsInvoice, typeDefsPerson, typeDefsUser ],
    resolvers: merge( resolvers, resolversBox, resolversClient, resolversCompany, resolversInvoice, resolversPerson, resolversUser ),
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