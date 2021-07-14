import jsonwebtoken from 'jsonwebtoken';
import lodash from 'lodash';
import nodemailer from 'nodemailer'

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

const createMail = async (mail) => {
    try {
            
        let infoMail = {
            from: '"Hicham lehouedj 👻" <hicham5lehouedj@gmail.com>',
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.text, // html body
        }

        const transporterConfig = {
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "hicham5lehouedj@gmail.com",
                pass: "H0675722241h"
            }
        }

        let transporter = nodemailer.createTransport(transporterConfig)

        let info = await transporter.sendMail(infoMail, (err, info) => {
            if(err) console.error(err);
        })

        return "The email has been sent successfully";

    } catch (error) {
        console.error(error)
    }
};






export { issueAuthToken, serializeUser, createMail }