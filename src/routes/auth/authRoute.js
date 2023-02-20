import Router from 'express';

import passport from 'passport';
import Jwt from 'jsonwebtoken';

import verifyRol from '../../middlewares/verifyRol.js';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();


const signingToken = (user) => {
    const { userid, name, email, roluser } = user;
    const token = Jwt.sign({ userid, name, email, roluser },
        process.env.TOKEN_SECRET);
    return token;
}

router.post('/signup',
    passport.authenticate('signup', { session: false }),
    (req, res) => {
        const token = signingToken(req.user);
        const { userid, name, email, roluser } = req.user;

        res.status(200).json({
            message: "signup successful, you can now login",
            user: { userid, name, email, roluser },
            x_access_token: token
        });
    }
);

router.post('/login',
    passport.authenticate('login', { session: false }),
    (req, res) => {
        try {
            const token = signingToken(req.user);
            res.status(200).json({ x_access_token: token });
        } catch (error) {
            console.error(error);
        }
    });

router.get('/profile',
    [passport.authenticate('jwt', { session: false }),
    verifyRol.verifyOperator],
    (req, res, next) => {
        console.log("testing what comes from jwt strategy",req.user);
        res.json({
            message: 'profile - passed auth',
            user: req.user
        });
    }
)

export default router;





/* login with mongo */
// router.post('/login',
//     async (req, res, next) => {
//         passport.authenticate('login',
//             async (err, user, info) => {
//                 try {
//                     if (err || user===false) {
//                         return res.status(401).json({ msg: "invalid user"});
//                     }

//                     req.login( user,
//                         { session: false },
//                         async (err) => {
//                             if (err) return next(err);
//                             const body = { _id: user._id, email: user.email }
//                             const token = Jwt.sign({ user: body }, process.env.TOKEN_SECRET);
//                             return res.json({ token });
//                         });
//                 } catch (e) {
//                     return next(e);
//                 }
//             })(req,res,next);
//     });

// /**login with postgres */
// router.post('/login',
//     async (req, res, next) => {
//         passport.authenticate('login',
//             async (err, user, info) => {
//                 try {
//                     if (err) console.error(err);
//                     if(user===false) return res.json({ msg: "invalid user"});
//                     req.login( user, { session: false }, 
//                         async (req,res,next) => {
//                             if (err) return next(err);
//                             const body = { userid: user.userid, email: user.email }
//                             const token = Jwt.sign({ user: body }, process.env.TOKEN_SECRET);
//                             return res.json({ token });
//                         }); 
//                 } catch (e) {
//                     return next(e);
//                 }
//             })(req,res,next);
//     });