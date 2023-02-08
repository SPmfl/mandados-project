import Router from 'express';
import createToken from '../../middlewares/createToken.js';


const router = Router();

// get token for testing
router.get('/login/:id',(req,res)=>{
    const token = createToken(req.params.id);
    res.status(200).json({
        token: `${token}`
    })
});


export default router;