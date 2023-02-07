import Point from '../db/deb-models/pointModel.js';

const getAllMarks = (req, res)=>{
    res.status(200).json({
        msg: "hola desde markpoint controller",
        func: "getAllMarks"
    });
}
const getMark = (req, res)=>{
    res.status(200).json({
        msg: "hola desde markpoint controller",
        func: `getMark ${req.params.id}`
    });
}

const createMark = async (req, res)=>{
    const {iduser,name,coordinates,comments,images} = req.body;
    const newPoint = new Point({iduser,name,coordinates,comments,images});
    const pointCreated = await newPoint.save();
    res.status(200).json(pointCreated);
}

const deleteMark = (req,res)=>{
    res.status(200).json({
        msg: "hola desde markpoint controller",
        func: `getMark ${req.params.id}`
    });
}
const updateMark = (req,res)=>{
    res.status(200).json({
        msg: "hola desde markpoint controller",
        func: `getMark ${req.params.id}`
    });
}

export {getAllMarks, getMark, createMark, deleteMark, updateMark}