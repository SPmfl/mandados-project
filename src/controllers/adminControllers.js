import User from '../db/deb-models/userModel.js';

const getAllOperators = async (req,res)=>{
    const allOperators = await User.findAll();
    res.status(200).json(allOperators);
}
const getOperator = (req,res)=>{
    res.status(200).json({
        msg: "hola desde admin controller",
        func: `getOperator`
    });
}
/* revisar como crear un usuario con el orm */
const createOperator = async (req,res)=>{
    const newUser = User.build(req.body.user);
    await newUser.save();

    res.status(200).json({
        msg: "user created",
        user: `${newUser}`
    });
}

const deleteOperator = (req,res)=>{
    res.status(200).json({
        msg: "hola desde admin controller",
        func: `deleteOperator`
    });
}
const updateOperator = (req,res)=>{
    res.status(200).json({
        msg: "hola desde admin controller",
        func: `updateOperator`
    });
}

export {getAllOperators, getOperator, createOperator, deleteOperator, updateOperator}

