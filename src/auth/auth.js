
import UserC from '../db/db-models/userCredentials.js';
import User from "../db/db-models/userModel.js";


import passport from 'passport';
import LocalStrategy from 'passport-local';
//import { Strategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

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

import pkg from 'passport-jwt';
const { Strategy, ExtractJwt } = pkg;

/** SIGNUP & SIGN IN  with postgres */
passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email2, password2, done) => {
        try {

            const userAlready = await User.findOne({ where: { email: email2 } });
            if (userAlready !== null) return done(null, false, { message: 'email ready registered' });

            const { userid, name, roluser, email } = req.body;
            const password = await bcrypt.hash(password2, 10);

            const user = await User.create({ userid, name, roluser, email, password });
            if (user === null) return done(null, false, { message: 'signup failed' });
            req.body.user = user;
            return done(null, user, { message: "can signup !" });
        } catch (error) {
            done(error);
        }
    }));


passport.use('signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email2, password2, done) => {
        try {

            const userAlready = await User.findOne({ where: { email: email2 } });
            if (userAlready == null) return done(null, false, { message: 'user dont exist' })

            const validation = User.isValidPassword(password2, userAlready.password);
            if (!validation) { return done(null, false, { message: 'wrong password' }) }
            req.body.user = userAlready;
            return done(null, userAlready, { message: "login successfull" });
        } catch (error) {
            done(error);
        }
    }));



passport.use('jwt',new Strategy({
    secretOrKey: `${process.env.TOKEN_SECRET}`,
    jwtFromRequest: ExtractJwt.fromHeader('x_access_token')
}, async (token, done) => {
    try {
        console.log("autenticando token",token);
        return done(null, token.user);
    } catch (error) {
        done(error)
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