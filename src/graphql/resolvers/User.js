import { ApolloError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { issueAuthToken, serializeUser, createMail, getRefreshToken } from '../../helpers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

import { User, Person, StockAccess  } from '../../models';

const { hash, compare } = bcrypt;
const SECRET = process.env.SECRET

export const resolvers = {

        Query: {
                user:           async (obj, args, context, info) => User.findByPk(args.id),

                currentUser: async (obj, args, {isAuth, user}, info) => {
                        if (isAuth) {
                                return user
                        }
                        return "You must be the authenticated user to get this information";
                },

                allUsers: async (obj, args, context, info) => {
                        let deleted = args.deleted || 0
                        return await User.findAll({
                                where: {
                                        '$person->stock_accesses.id_stock$': args.idStock,
                                        '$person.deleted$':  deleted
                                },
                                include: {
                                        model: Person,
                                        as: 'person',
                                        required: true,
                                        right: true,
                                        include: {
                                                model: StockAccess,
                                                as: 'stock_accesses',
                                                required: true,
                                                right: true
                                        }
                                }
                        })
                },

                // allUsersLimitedBy:       async (obj, args, context, info) => {
                //         try {
                //                 if (args.option !== null && args.option !== undefined && args.option !== "") {
                                        
                //                         return await User.findAll({
                //                                 where: JSON.parse(args.option),
                //                                 offset: args.offset,
                //                                 limit: args.limit
                //                         })
                //                 }

                //                 return await User.findAll({ offset: args.offset, limit: args.limit })

                //         } catch (error) {
                //                 throw new ApolloError(error.message, 404)
                //         }
                // },

                refreshToken: async (obj, args, {refreshToken}, info) => {
                        if (!refreshToken || refreshToken === "") {
                                throw new AuthenticationError( "Refresh token does not exist" );
                        }

                        let decodedToken;
                        try {
                                decodedToken = jwt.verify(refreshToken, SECRET);
                        } catch (err) {
                                throw new AuthenticationError("Refresh token invalid or expired")
                        }

                        // If decoded token is null then set authentication of the request false
                        if (!decodedToken) {
                                throw new AuthenticationError("Refresh token invalid or expired")
                        }

                        let useragent = `${context.req.useragent.browser}: ${context.req.useragent.version}, ${context.req.useragent.platform}: ${context.req.useragent.os}, ${context.req.useragent.source}`

                        if (useragent !== decodedToken.useragent) {
                                throw new AuthenticationError("The user is not properly logged in")
                        }

                        // If the user has valid token then Find the user by decoded token's id
                        let authUser = await User.findByPk(decodedToken.id);
                        if (!authUser) {
                                return "User Does not exist";
                        }

                        let token = await issueAuthToken({id: authUser.id});

                        return {
                                token
                        }
                }
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
                                let token = await issueAuthToken({id: user.id});

                                // await createMail ({
                                //         to: "hicham55lehouedj@gmail.com",
                                //         subject: "Email Verification",
                                //         text: token
                                // });

                                let useragent = `${context.req.useragent.browser}: ${context.req.useragent.version}, ${context.req.useragent.platform}: ${context.req.useragent.os}, ${context.req.useragent.source}`

                                let refreshToken = await getRefreshToken({id: user.id, useragent: useragent});
                                
                                context.res.cookie('___refresh_token', refreshToken, {
                                        expires: new Date(Date.now() + 3600000*24*7), // Hours * 24 * 7
                                        maxAge: 3600000*24*7, // Hours * 24 * 7
                                        httpOnly: true
                                })

                                return {
                                        //user,
                                        token
                                }
                        } catch (error) {
                                throw new ApolloError(error.message, 404)
                        }
                },

                createUser: async (obj, {content}, context, info) => {
                        try {

                                let user = await User.findOne({ where: { user_name: content.user_name } });

                                if (user) { throw new ApolloError('Username is already Exist.') }

                                user = await User.findOne({ where: { id_person: content.id_person } });

                                if (user) { throw new ApolloError('Person is already registred.') }

                                // Hash the user password
                                let hashPassword = await hash(content.password, 10);
                                
                                let result = await User.create({
                                        user_name: content.user_name,
                                        password: hashPassword,
                                        role: content.role,
                                        id_person: content.id_person
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

                updateUser: async (obj, {id_person, content}, context, info) => {
                        try {
                                let token = "";
                                
                                let user = await User.findOne({where: {id_person}});

                                let isMatch = await compare(content.oldPassword, user.password);

                                if (user && isMatch) {

                                        let person = null;
                                        let hashNewPassword = null;
                                        let result = null;

                                        if (content.person) {
                                                person = await Person.update(content.person, { where: { id: id_person } });
                                        }

                                        if (content.newPassword) {
                                                hashNewPassword = await hash(content.newPassword, 10);
                                        }
                                        
                                        if (hashNewPassword !== null) {
                                                result = await User.update({
                                                        user_name: content.user_name,
                                                        password: hashNewPassword,
                                                        role: content.role
                                                }, { where: { id_person } })
                                        } else {
                                                result = await User.update({
                                                        user_name: content.user_name,
                                                        role: content.role
                                                }, { where: { id_person } })
                                        }

                                        result = await serializeUser(result);

                                        token = await issueAuthToken(result);

                                }
                                
                                return {
                                        token: token
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                },

                deleteUser: async (obj, {id_person}, context, info) => {
                        try {
                                let result = await Person.update({deleted: true},{ where: { id: id_person } })
                                return {
                                        status: result[0] === 1 ? true : false
                                }
                        } catch (error) {
                                throw new ApolloError(error.message)
                        }
                }
        }
}
