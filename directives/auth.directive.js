import {defaultFieldResolver} from "graphql";
import { ApolloError, SchemaDirectiveVisitor } from 'apollo-server';

export default class IsAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;


        console.log('log visit Field Definition => ', field);


        field.resolve = async function (...args) {

            
            console.log('log field resolve => ', args);

            
            let [_, {}, { user, isAuth }] = args;
            if (isAuth) {
                const result = await resolve.apply(this, args);
                return result;
            } else {
                throw new ApolloError(
                    'You must be the authenticated user to get this information'
                );
            }
        };
    }
}
