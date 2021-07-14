import { gql } from 'apollo-server';

export const typeDefs = gql`

        extend type Query {
                user(id: ID!): User! @isAuth
                allUsers: [User!]!
                allUsersLimited(offset: Int,  limit: Int): [User!]!
                allUsersLimitedBy(offset: Int,  limit: Int, option: String): [User!]!
        }

        extend type Mutation {
                authenticateUser(email: String!, password: String!): AuthUser!
                createUser (user_name: String, password: String, role: String, activation: String, id_person: Int): AuthUser!
        }

        type User {
                id:             ID!
                user_name:      String
                password:       String
                role:           String
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