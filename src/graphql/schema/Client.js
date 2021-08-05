import { gql } from 'apollo-server-express';

export const typeDefs = gql`
        extend type Query {
                client(id: ID!): Client!
                allClients: [Client!]!
        }

        extend type Mutation {
                createClient (first_name: String, last_name: String, email: String, phone01: String, phone02: String, address: String, id_company: Int): Client
                updateClient (id_person: Int!, first_name: String, last_name: String, email: String, phone01: String, phone02: String, address: String, id_company: Int): statusUpdate
                deleteClient ( id: Int! ): statusDelete
        }


        type Client {
                id:     ID!
                person: Person
        }

`;