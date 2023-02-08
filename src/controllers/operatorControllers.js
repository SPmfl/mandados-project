
const getInfo = async (req,res)=>{
    
    res.status(200).json({
        msg: "hola desde operator controller",
        func: `getInfo`
    });
}

const updateInfo = (req,res)=>{
    res.status(200).json({
        msg: "hola desde operator controller",
        func: `updateInfo`
    });
}




export {getInfo, updateInfo}