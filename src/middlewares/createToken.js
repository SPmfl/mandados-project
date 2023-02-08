import jwt from 'jsonwebtoken';

const createToken = (iduser)=>{
    const token = jwt.sign(iduser, process.env.SECRET);
    return token;
}

export default createToken;