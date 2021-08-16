import jsonwebtoken from 'jsonwebtoken';
import lodash from 'lodash';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const SECRET = process.env.SECRET
const { pick } = lodash;
const { sign } = jsonwebtoken;


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
            html: `
                <body style="width: 90%;  text-align: center; background: #eee; padding: 80px 20px; font-family: 'Changa', sans-serif;">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Changa:wght@300&display=swap" rel="stylesheet">
                    <h1 style="text-align: center;  margin: 50px auto 30px;" >التحقق من البريد الالكتروني</h1>
                    <h5 style="font-size: 18px; margin-bottom: 50px;" >اضغط على زر تحقق للتحقق من انك انت من قمت بالتسجيل في موقع</h5>
                    <a href="http://localhost:4000/graphql?token=${mail.text.split(" ")[1]}" style="background-color: #3b49df; color: #fff; padding: 10px 45px; font-size: 20px; text-decoration: none;" class="btn">تحقق</a>
                </body>
            `
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

        await transporter.sendMail(infoMail, (err, info) => {
            if(err) console.error(err);
            else  console.log(info);
        })

        return "The email has been sent successfully";

    } catch (error) {
        console.error(error)
    }
};






export { issueAuthToken, serializeUser, createMail }