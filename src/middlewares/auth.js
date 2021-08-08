
import jwt from 'jsonwebtoken';
import { User, AuthTrace } from '../models';
import dotenv from 'dotenv'
dotenv.config();

const SECRET = process.env.SECRET

export const AuthMiddleware = async (req, res, next) => {

    
    console.log("AuthMiddleware =====================================> 02");

    // Extract Authorization Header
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    
    // Extract the token and check for token
    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    // Verify the extracted token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    // If decoded token is null then set authentication of the request false
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    // If the user has valid token then Find the user by decoded token's id
    let authUser = await User.findByPk(decodedToken.id);
    if (!authUser) {
        req.isAuth = false;
        return next();
    }

    await AuthTrace.create({token : token, user_name: decodedToken.user_name, action: "Token Checked" })

    req.isAuth = true;
    req.user = authUser;
    return next();
}