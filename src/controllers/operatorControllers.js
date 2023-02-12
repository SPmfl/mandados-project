import getIdByToken from '../middlewares/getIdByToken.js';
import User from '../db/db-models/userModel.js';
import { Op } from 'sequelize';


const getInfo = (req, res, next) => {
    res.json({
        message: 'Operator profile information',
        user: req.user
    });
}



const getInfoPruebaFront = async (req,res)=>{
    try {

        res.status(200).json({
            userid: 123456,
            name: 'name',
            email: 'email@sample.com',
            rol: 'operator123141'
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({msg: "server error - can't retrieve information"});
    }
}


const getInfo2 = async (req,res)=>{
    try {
        const iduser = getIdByToken(req.headers['x-access-token']);
        console.log(`user id: ${iduser}`);
        const operator = await User.findAll({
            where: { userid: { [Op.eq]: iduser } }
        });
        res.status(200).json(operator);
    } catch (error) {
        console.error(error);
        res.status(200).json({msg: "server error - can't retrieve information"});
    }
}

const updateInfo = async(req,res)=>{
    try {





        const useridtoken = getIdByToken(req.headers['x-access-token']);
        const { name } = req.body;
        await User.update({ name },
            {
                where: { userid: useridtoken }
            });
        res.status(202).json({ msg: "information was successfully updated" });
    } catch (error) {
        console.error(error);
        res.status(200).json({msg: "server error - can't update information"});
    }
}

export {getInfo, getInfoPruebaFront, updateInfo}