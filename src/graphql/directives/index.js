
import { createRateLimitDirective } from 'graphql-rate-limit-directive';
import IsAuthDirective from './auth.directive';
import hasRoleDirective from './roles.directive'
import FormatDateDirective from './FormatDate.Directive';

export const schemaDirectives = {
    isAuth: IsAuthDirective,
    hasRole: hasRoleDirective,
    rateLimit: createRateLimitDirective(),
    date: FormatDateDirective
};