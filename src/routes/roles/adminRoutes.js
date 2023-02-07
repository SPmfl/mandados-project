import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as adminCtrl from '../../controllers/adminControllers.js';

const router = Router();

router.get('/',(req,res)=>{
    res.status(200).json({
        msg: "hola como está"
    })
})

router.get('/operators', adminCtrl.getAllOperators);
router.get('/operators/:id', adminCtrl.getOperator);
router.post('/operators/', adminCtrl.createOperator);
router.delete('/operators/:id', adminCtrl.deleteOperator);
router.put('/operators/:id', adminCtrl.updateOperator);

router.get('/marks', markPointCtrl.getAllMarks);
router.get('/marks/:id', markPointCtrl.getMark);
router.post('/marks/', markPointCtrl.createMark);
router.delete('/marks/:id', markPointCtrl.deleteMark);
router.put('/marks/:id', markPointCtrl.updateMark);

export default router;