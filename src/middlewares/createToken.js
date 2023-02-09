import jwt from 'jsonwebtoken';

const createToken = (iduser)=>{
    const token = jwt.sign(iduser, process.env.TOKEN_SECRET);
    return token;
}

export default createToken;