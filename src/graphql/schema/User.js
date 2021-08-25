import { gql } from 'apollo-server-express';

export const typeDefs = gql`

        extend type Query {
                user(id: ID!): User! @isAuth
                currentUser: User! @isAuth

                # deleted defullt value false
                allUsers(idStock: ID!, deleted: Boolean): [User!]!
                
                # allUsersLimitedBy(offset: Int!,  limit: Int!, option: String): [User!]!
                refreshToken: AuthUser
        }

        extend type Mutation {
                authenticateUser(email: String!, password: String!): AuthUser!
                createUser (content: contentUser!): AuthUser!
                emailVerification(token: String!): AuthUser
                updateUser (id_person: ID!, content: contentUpdateUser): AuthUser
                deleteUser (id_person: ID!): statusDelete
        }

        type User {
                id:             ID!
                user_name:      String
                password:       String @hasRole(requires: USER)
                role:           String @isAuth
                activation:     String
                person:         Person!
        }

        type AuthUser {
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

        input contentUser {
                user_name: String
                password: String
                role: String
        }

        input contentUpdateUser {
                user_name: String
                oldPassword: String!
                newPassword: String
                role: String
                person: contentPerson
        }
`;