import { gql } from 'apollo-server-express';

export const typeDefs = gql`

        extend type Query {
                subscription(id: ID!): Subscription!
                allSubscriptions: [Subscription!]!
        }

        extend type Mutation {
                createSubscription (payment: String, package: String, id_company: Int!): Subscription!
                updateSubscription (id: Int!, payment: String, package: String, id_company: Int!): statusUpdate
                deleteSubscription (id: Int!)
        }

        type Subscription {
                id:             ID!
                payment:        String
                package:        String
                start_date:     Date
                expiry_date:    Date
                createdAt:      Date
                updatedAt:      Date
                company:        Company
        }
`;