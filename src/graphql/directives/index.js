
import { createRateLimitDirective } from 'graphql-rate-limit-directive';
import IsAuthDirective from './auth.directive';
import hasRoleDirective from './roles.directive'

export const schemaDirectives = {
    isAuth: IsAuthDirective,
    hasRole: hasRoleDirective,
    rateLimit: createRateLimitDirective()
};