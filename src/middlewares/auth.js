
import User from "../db/db-models/userModel.js";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config();





/** SIGNUP & SIGN IN  with postgres */
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, reqEmail, reqPassword, done) => {
        try {
            //sanitize email with blank spaces
            if (!reqEmail) return done(null, false, { message: "email not provided" });
            const sanitizedEmail = reqEmail.trim();

            // verify if user already exist
            const userAlready = await User.findOne({ where: { email: sanitizedEmail } });
            if (userAlready !== null) return done(null, false, { message: 'email ready registered' });

            // take data from request
            const { userid, name, roluser } = req.body;
            const hashedPassword = await bcrypt.hash(reqPassword, 10);

            console.log(`email&password :::: ${sanitizedEmail} - ${hashedPassword}`);

            // save new user on database
            const user = await User.create(
                {
                    userid,
                    name,
                    roluser,
                    email: sanitizedEmail,
                    password: hashedPassword
                });
            if (user === null || !user) return done(null, false, { message: 'signup failed' });
            
            // attach new user data to request
            return done(null, user.dataValues, { message: "can now Login !" });
        } catch (error) {
            return done(error);
        }
    }));


passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, reqEmail, reqPassword, done) => {
        try {
            if (!reqEmail) return done(null, false, { message: "email not provided" });
            const sanitizedEmail = reqEmail.trim();

            const userAlready = await User.findOne({ where: { email: sanitizedEmail } });
            if (userAlready === null || userAlready === undefined) {
                console.log("user not exist");
                return done(null, false, { message: 'user dont exist' });
            }

            const validation = await User.isValidPassword(reqPassword, userAlready.password);
            // console.log("password validation ", validation);
            if (!validation) {
                console.log("user password wrong!");
                return done(null, false, { message: 'wrong password' });
            }
            delete req.body.email;
            delete req.body.password;
            // delete userAlready.dataValues.password;
            return done(null, userAlready.dataValues, { message: "login successfull" });
        } catch (error) {
            return done(error);
        }
    }));




passport.use('jwt', new Strategy({
    secretOrKey: `${process.env.TOKEN_SECRET}`,
    jwtFromRequest: ExtractJwt.fromHeader('x_access_token')
}, async (dataFromToken, done) => {
    try {
        if(!dataFromToken) return done(null, false, { message: 'token not provided' });
        
        delete dataFromToken.iat;
        const userAlready = await User.findOne({ where: { email: dataFromToken.email } });
        if (userAlready === null || userAlready === undefined) 
            return done(null, false, { message: 'invalid token' });

        return done(null, userAlready.dataValues.roluser, { msg: "valid token" });
    } catch (error) {
        return done(error)
    }
}));


// passport.use('jwt2',new Strategy({
//     secretOrKey: `${process.env.TOKEN_SECRET}`,
//     jwtFromRequest: ExtractJwt.fromHeader('x_access_token')
// }, async (token, done) => {
//     try {
//         if(!jwtFromRequest) {return done(null, false, {msg: "no token provided"}) }

//         const decoded = jwt.verify(jwtFromRequest, process.env.TOKEN_SECRET);


//         return done(null, token.user)
//     } catch (error) {
//         done(error)
//     }
// }));



/** SIGNUP & SIGN IN  with mongo */
// passport.use('signup', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         const user = await UserC.create({ email, password });
//         return done(null, user);
//     } catch (error) {
//         done(error)
//     }
// }));


// passport.use('login', new localStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         const user = await UserC.findOne({ email });
//         if (user === null){
//             console.log(`este es el user 1: ${user}`);
//             done(null, false, { message: 'email not found' });
//             return;
//         }
//         console.log(`este es el user 2: ${user}`);

//         const validate = await user.isValidPassword(password);
//         console.log("esta es la validacion",validate);

//         if(!validate) return done(null, false, { message: 'wrong password'});

//         return done(null, user, { message: 'Login successfull'});
//     } catch (error) {
//         return done(error)
//     }
// }));



//     secretOrKey: `${process.env.TOKEN_SECRET}`,
//     jwtFromRequest: ExtractJwt.fromBodyField('x_access_token')
// }, async (token, done) =>{
//     try {
//         return done(null, token.user)
//     } catch (error) {
//         done(error)
//     }
// }));