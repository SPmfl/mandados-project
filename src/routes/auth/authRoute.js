import Router from 'express';

import passport from 'passport';
import Jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();


const signingToken = (req) => {
    // const body = { userid: req.body.user.userid, email: req.body.user.email }
    const { userid, name, email, rol } = req.body.user;
    //console.log("firmando token con userid y email", body);
    // const token = Jwt.sign({ user: body }, process.env.TOKEN_SECRET);
    const token = Jwt.sign({ user: { userid, name, email, rol } }, process.env.TOKEN_SECRET);
    return token;
}


router.post('/signup',
    passport.authenticate('signup', { session: false }),
    (req, res) => {
        const token = signingToken(req);
        res.status(200).json({
            message: "signup successful, you can now login",
            user: req.body.user,
            x_access_token: token
        });
    }
);


router.post('/login', passport.authenticate('signin', { session: false }),
    function (req, res) {
        const token = signingToken(req);
        res.status(200).json({ x_access_token: token });
    });


router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
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