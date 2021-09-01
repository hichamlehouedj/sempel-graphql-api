
import { createRateLimitDirective } from 'graphql-rate-limit-directive';
import FormatDateDirective from './FormatDate.Directive';

export const schemaDirectives = {
    rateLimit: createRateLimitDirective(),
    date: FormatDateDirective
};