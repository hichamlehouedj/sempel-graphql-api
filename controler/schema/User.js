import { gql } from 'apollo-server';

export const typeDefs = gql`

        directive @isAuth on FIELD_DEFINITION

        extend type Query {
                user(id: ID!): User! @isAuth
                allUsers: [User!]!
                allUsersBy(option: String): [User!]!
                allUsersLimitedBy(offset: Int!,  limit: Int!, option: String): [User!]!
        }

        extend type Mutation {
                authenticateUser(email: String!, password: String!): AuthUser!
                createUser (user_name: String, password: String, role: String, activation: String, id_person: Int): AuthUser!
                emailVerification(token: String!): AuthUser
        }

        type User {
                id:             ID!
                user_name:      String
                password:       String @isAuth
                role:           String @isAuth
                activation:     String
                person:         Person!
        }

        type AuthUser {
                user:           User!
                token:          String!
        }

        type AuthTrace {
                id:             ID!
                token:          String
                user_name:      String
                action:         String
                createdAt:      Date
                company:        Company
        }
`;