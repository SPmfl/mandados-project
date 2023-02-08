import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const getIdByToken = (token)=>{
    try {
        return jwt.verify(token, process.env.SECRET);
    }catch (error) {
        console.error(error);
    }
}
export default getIdByToken;