import jsonwebtoken from 'jsonwebtoken';
import lodash from 'lodash';

const { pick } = lodash;
const { sign } = jsonwebtoken;

const SECRET = "H0675722241h";

const issueAuthToken = async (jwtPayload) => {
    let token = await sign(jwtPayload, SECRET, {
        expiresIn: 3600*24*7
    });
    return `Bearer ${token}`;
};

const serializeUser = (user) => pick(user, [
    'id',
    'user_name',
    'role',
    'activation',
    'id_person'
]);


export { issueAuthToken, serializeUser }