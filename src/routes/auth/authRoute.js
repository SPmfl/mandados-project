import Router from 'express';

import passport from 'passport';
import Jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/signup',
    passport.authenticate('signup', { session: false }),
    (req, res) => {
        res.status(200).json({
            message: "signup successful, you can now login",
            user: req.body.user
        });
    }
);

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



router.post('/login', passport.authenticate('signin',{ session: false }),
    function (req, res) {
        const token = signingToken(req);
        console.log("lsoslsodkadad", token);
        res.status(200).json({x_access_token:token});
    });

const signingToken = (req) => {
    const body = { userid: req.body.userid, email: req.body.email }
    const token = Jwt.sign({ user: body }, process.env.TOKEN_SECRET);
    return token;
}


router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.json({
            message: 'hola con auth',
            user: req.body,
            token: req.body.x_access_token
        });
    }
)

export default router;