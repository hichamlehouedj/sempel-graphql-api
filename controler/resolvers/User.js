import { ApolloError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { issueAuthToken, serializeUser, createMail } from '../../helpers';

import { User, Person  } from '../../models';

const { hash, compare } = bcrypt;

export const resolvers = {

        Query: {
                user:           async (obj, args, context, info) => User.findByPk(args.id),

                allUsers:       async (obj, args, context, info) => User.findAll(),

                allUsersBy:       async (obj, args, context, info) => User.findAll({
                        where: JSON.parse(args.option)
                }),

                allUsersLimitedBy:       async (obj, args, context, info) => {
                        try {
                                if (args.option !== null && args.option !== undefined && args.option !== "") {
                                        
                                        return await User.findAll({
                                                where: JSON.parse(args.option),
                                                offset: args.offset,
                                                limit: args.limit
                                        })
                                }

                                return await User.findAll({ offset: args.offset, limit: args.limit })

                        } catch (error) {
                                throw new ApolloError(error.message, 404)
                        }
                },
        },

        User: {
                person: async (obj, args, context, info) => Person.findByPk(obj.id_person),
        },

        Mutation: {
                authenticateUser: async (obj, args, context, info) => {
                        try {
                                let person = await Person.findOne({ where: { email: args.email } });
                                
                                // Person is exist
                                if (!person) { throw new ApolloError('User not found'); }

                                let user = await User.findOne({ where: { id_person: person.id } });

                                // User is exist
                                if (!user) { throw new ApolloError('User not found'); }
                                
                                let isMatch = await compare(args.password, user.password);

                                // If Password don't match
                                if (!isMatch) { throw new ApolloError("Password not incorrect"); }

                                user = await serializeUser(user);

                                

                                // Issue Token
                                let token = await issueAuthToken(user);

                                await createMail ({
                                        to: "hicham55lehouedj@gmail.com",
                                        subject: "verfy email",
                                        text: token
                                });

                                return {
                                        user,
                                        token
                                }
                        } catch (error) {
                                throw new ApolloError(error.message, 404)
                        }
                },

                createUser: async (obj, args, context, info) => {
                        try {

                                let user = await User.findOne({ where: { user_name: args.user_name } });

                                if (user) { throw new ApolloError('Username is already Exist.') }

                                user = await User.findOne({ where: { id_person: args.id_person } });

                                if (user) { throw new ApolloError('Person is already registred.') }

                                // Hash the user password
                                let hashPassword = await hash(args.password, 10);
                                
                                let result = await User.create({
                                        user_name: args.user_name,
                                        password: hashPassword,
                                        role: args.role,
                                        activation: args.activation,
                                        id_person: args.id_person
                                })

                                result = await serializeUser(result);

                                let token = await issueAuthToken(result);

                                return {
                                        user: result,
                                        token: token
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },
        }
}
