import Point from '../db/db-models/pointModel.js';

const getAllMarks = async (req, res)=>{
    try {
        const allMarks = await Point.find(); 
        res.status(200).json(allMarks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error - server can not retrieve point marks"});
    }

}
const getMark = async (req, res)=>{
    try {
        const mark = await Point.findById(req.params.id);
        res.status(200).json(mark);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error - server can not retrieve point mark"});
    }
}

const createMark = async (req, res)=>{
    try {
        const {iduser,name,coordinates,comments,images} = req.body;
        const newPoint = new Point({iduser,name,coordinates,comments,images});
        const pointCreated = await newPoint.save();
        res.status(200).json(pointCreated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error - point mark not created"});
    }
}

const deleteMark = async (req,res)=>{
    try {
        await Point.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Point mark deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error - point mark not deleted"});
    }
}

const updateMark = async (req,res)=>{
    try {
        const {iduser, name, coordinates, comments, images} = req.body;
        const updatedMark = await Point.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedMark);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error - point mark not updated"});
    }
}

export {getAllMarks, getMark, createMark, deleteMark, updateMark}