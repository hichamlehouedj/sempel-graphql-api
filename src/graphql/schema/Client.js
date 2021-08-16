import { gql } from 'apollo-server-express';

export const typeDefs = gql`
        extend type Query {
                client(id: ID!): Client!
                allClientsStock(idStock: ID!): [Client!]!
                allClientsCompany(idCompany: ID!): [Client!]!
        }

        extend type Mutation {
                createClient (content: contentClient!): Client
                updateClient (id: Int!, content: contentClient!): statusUpdate
                deleteClient ( id: Int! ): statusDelete
        }


        type Client {
                id:     ID!
                person: Person
        }

        input contentClient {
                person: contentPerson
        }
`;