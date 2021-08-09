import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        box(id: ID!): Box!
        allBox(idStock: ID!): [Box!]
    }

    extend type Mutation {
        createBox (content: boxContent!): Box

        updateBox (id: Int!, content: boxContent!): statusUpdate

        deleteBox ( id: Int! ): statusDelete
    }

    extend type Subscription {
        boxCreated(idStock: Int!): Box
    }

    type Box {
        id:                                 ID!
        recipient_name:                     String
        recipient_phone1:                   String
        recipient_phone2:                   String
        recipient_city:                     String
        recipient_address:                  String
        statu_box:                          String
        code_box:                           String
        content_box:                        String
        number_of_pieces_inside_the_box:    Int
        number_box:                         String
        payment_type:                       String
        height_box:                         String
        width_box:                          String
        weight_box:                         String
        price_box:                          Float
        price_delivery:                     Float
        TVA:                                Int
        note:                               String
        createdAt:                          Date
        updateAt:                           Date
        stock:                              Stock
        client:                             Client
        lastTrace:                          [BoxTrace]!
    }

    input boxContent {
        recipient_name:                     String
        recipient_phone1:                   String
        recipient_phone2:                   String
        recipient_city:                     String
        recipient_address:                  String
        statu_box:                          String
        code_box:                           String
        content_box:                        String
        number_of_pieces_inside_the_box:    Int
        number_box:                         String
        payment_type:                       String
        height_box:                         String
        width_box:                          String
        weight_box:                         String
        price_box:                          Float
        price_delivery:                     Float
        TVA:                                Int
        note:                               String
        id_stock:                           Int
        id_client:                          Int
    }
`;