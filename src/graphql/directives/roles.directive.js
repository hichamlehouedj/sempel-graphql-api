import {defaultFieldResolver} from "graphql";
import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';

export default class hasRoleDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {

        const requiredRole = this.args.requires;
        const originalResolve = field.resolve || defaultFieldResolver;

        const { resolve = defaultFieldResolver } = field;

        
        
        console.log("============================================> hasRoleDirective <============================================");
        console.log("requiredRole =>", requiredRole);

        field.resolve = async function (...args) {
            
            let [_, {}, { user, isAuth }] = args;

            let role = user.dataValues.role.toUpperCase()

            const isAuthorized = isAuth && role === requiredRole;
            console.log({role, isAuth,  isAuthorized});
            
            if (!isAuthorized) {
                throw new AuthenticationError(`You need following role: ${requiredRole}`);
            }

            return originalResolve.apply(this, args);
        };
    }
}