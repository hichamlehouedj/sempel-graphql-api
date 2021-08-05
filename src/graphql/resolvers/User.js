import { ApolloError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { issueAuthToken, serializeUser, createMail } from '../../helpers';
import jwt from 'jsonwebtoken';

const SECRET = "H0675722241h";

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
                                        subject: "Email Verification",
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

                emailVerification: async (obj, args, context, info) => {
                        try {

                                let token = args.token;

                                // Verify the extracted token
                                let decodedToken;
                                try {
                                        decodedToken = jwt.verify(token, SECRET);
                                } catch (err) {
                                        throw new ApolloError(err.message)
                                }

                                // If decoded token is null then set authentication of the request false
                                if (!decodedToken) {
                                        throw new ApolloError("authorization expired or unauthorized");
                                }

                                // If the user has valid token then Find the user by decoded token's id
                                let authUser = await User.findByPk(decodedToken.id);
                                if (!authUser) {
                                        throw new ApolloError("User not found")
                                }

                                await User.update({'activation': 'active'}, { where: { id: decodedToken.id } })
                                
                                let user = await User.findOne({ where: { id: decodedToken.id } });

                                user = await serializeUser(user);

                                // New Token
                                token = await issueAuthToken(user);

                                return {
                                        user,
                                        token
                                }

                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },
        }
}
