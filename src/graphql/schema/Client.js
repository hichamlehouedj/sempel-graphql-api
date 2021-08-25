import { gql } from 'apollo-server-express';

export const typeDefs = gql`
        extend type Query {
                client(id: ID!): Client!
                # allClientsStock(idStock: ID!): [Client!]!
                # allClientsCompany(idCompany: ID!): [Client!]!
                allClients(idStock: ID!, deleted: Boolean): [Client!]!
        }

        extend type Mutation {
                createClient (content: contentClient!): Client
                updateClient (id_person: ID!, content: contentClient!): statusUpdate
                deleteClient (id_person: ID!): statusDelete
        }


        type Client {
                id:     ID!
                person: Person
                user: [User!]
        }

        input contentClient {
                person: contentPerson!
        }
`;