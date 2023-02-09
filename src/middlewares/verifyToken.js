import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../db/db-models/userModel.js';
import { Op } from 'sequelize';

dotenv.config();

const verifyToken = async (req, res, next)=>{
    try {
        //token decodification
        const token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({msg: "token not provided"});
        let idDecoded = jwt.verify(token, process.env.TOKEN_SECRET);

        //user verification
        const user = await User.findAll({
            where: { userid: { [Op.eq]: idDecoded } }
        }).catch(console.error);
        if(!user) return res.status(404).json({msg: "user not found"});

        next();
    } catch (error) {
        console.error(error);
        return res.status(501).json({msg: "unauthorized"});
    }
}

export default verifyToken;