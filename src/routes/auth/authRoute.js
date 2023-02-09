import Router from 'express';
import createToken from '../../middlewares/createToken.js';

import passport from 'passport';
import  Jwt  from 'jsonwebtoken';
import userC from '../../db/db-models/userCredentials.js';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: "signup successful bro!",
        user: req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login',
        async (err, user, info) => {
            try {
                if (err || user) {
                    console.error(err);
                    const nError = new Error('new Error');
                    return next(nError);
                }

                req.login(user,
                    { session: false },
                    async (err)=>{
                        if(err) return next(err);
                        const body = { _id: user._id, email:userC.email}
                        const token = Jwt.sign({user:body}, process.env.TOKEN_SECRET);
                        return res.json({ access_token: token })
                    }
                );
            } catch (e) {
                return next(e);
            }
        });
});



router.get('/profile', passport.authenticate('jwt', { session:false}),
    (req,res,next)=>{
        res.json({
            message: 'hola con auth',
            user: req.user,
            token: req.query.access_token 
        });
    }
)

export default router;