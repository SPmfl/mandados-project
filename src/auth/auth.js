import passport from "passport";
import localStrategy from 'passport-local';
import UserC from '../db/db-models/userCredentials.js';

import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

import dotenv from 'dotenv';

dotenv.config();

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserC.create({ email, password });
        return done(null, user);
    } catch (error) {
        done(error)
    }
}));


passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserC.findOne({ email });
        if (!user) return done(null, false, { message: 'email not found' });

        const validate = await user.isValidPassword(password);

        if(!validate) return done(null, false, { message: 'wrong password'});

        return done(null, user, { message: 'Login successfull'});
    } catch (error) {
        return done(error)
    }
}));

passport.use(new Strategy({
    secretOrKey: `${process.env.TOKEN_SECRET}`,
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token')
}, async (token, done) =>{
    try {
        return done(null, token.user)
    } catch (error) {
        done(error)
    }
}));