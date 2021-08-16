
import formatDate from 'dateformat';
import {defaultFieldResolver} from "graphql";
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLString } from 'graphql';


export default class FormatDateDirective extends SchemaDirectiveVisitor {
  
    visitFieldDefinition(field) {
  
      // Get the field's resolver
      const { resolve = defaultFieldResolver } = field;
  
      // Get the default date format
      const { defaultFormat } = this.args;
  
      // *Add* a `format` argument to the GraphQL field for
      // clients to use
      field.args.push({ name: 'format', type: GraphQLString });
  
      // *Replace* the field's resolver with this function, which
      // first calls the *original* resolver, then formats the
      // returned date
      field.resolve = async function ( source, { format, ...otherArgs }, context, info, ) {
        const date = await resolve.call(this, source, otherArgs, context, info);
        // If the client does not specify a format, use defaultFormat
        return formatDate(date, format || defaultFormat);
      };
  
      // The field now returns a String instead of a Date.
      // Update it accordingly.
      field.type = GraphQLString;
    }
  }