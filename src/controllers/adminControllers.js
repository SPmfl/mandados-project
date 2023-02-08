import User from '../db/db-models/userModel.js';
import { Op } from 'sequelize';

const getAllOperators = async (req, res) => {
    try {
        const allOperators = await User.findAll({ where: { rol: { [Op.eq]: 'operator' } } });
        res.status(200).json(allOperators);
    } catch (error) {
        res.status(500).json({ msg: "server error - can not retrieve all operators" });
        console.error(error);
    }
}

const getOperator = async (req, res) => {
    try {
        const operator = await User.findAll({
            where: { userid: { [Op.eq]: req.params.id } }
        });
        res.status(200).json(operator);
    } catch (error) {
        res.status(500).json({ msg: "server error - can not retrieve the operator" });
        console.error(error);
    }
}

const createOperator = async (req, res) => {
    try {
        const { userid, name, rol } = req.body;
        const newUser = await User.create({ userid, name, rol });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ msg: "server error - can not create a new operator" });
        console.error(error);
    }
}

const deleteOperator = async (req, res) => {
    try {
        if (!verifyUser(req.params.id)) {
            res.status(404).json({ msg: "operator doesn't exists" });
            return;
        }
        User.destroy({
            where: { userid: { [Op.eq]: req.params.id } }
        });
        res.status(200).json({ msg: "operator was successfully deleted" });

    } catch (error) {
        console.error("error deleting operator", error);
        res.status(500).json({ msg: "server error - can not delete the operator" })
    }
}

const updateOperator = async (req, res) => {
    try {
        if (!verifyUser(req.params.id)) {
            res.status(404).json({ msg: "operator doesn't exists" });
            return;
        }
        const { userid, name, rol } = req.body;
        await User.update({ userid, name, rol },
            {
                where: { userid: req.params.id }
            });
        res.status(202).json({ msg: "operator was successfully updated" });
    } catch (error) {
        res.status(500).json({ msg: "server error - can not update the operator" })
    }
}

const verifyUser = async(id)=>{
    const operator = await User.findAll({
        where: { userid: { [Op.eq]: id } }
    });
    if(operator) return true;
    return false;
}

export { getAllOperators, getOperator, createOperator, deleteOperator, updateOperator }

