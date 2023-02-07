import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as operatorCtrl from '../../controllers/operatorControllers.js';

const router = Router();

router.get('/',(req,res)=>{
    res.status(200).json({ msg: "hola como está" });
})

/** operator routes controller definition */
router.get('/info', operatorCtrl.getInfo);
router.put('/info', operatorCtrl.updateInfo);

/** markpoint routes controller definition */
router.get('/marks', markPointCtrl.getAllMarks);
router.get('/marks/:id', markPointCtrl.getMark);
router.post('/marks/', markPointCtrl.createMark);
router.delete('/marks/:id', markPointCtrl.deleteMark);
router.put('/marks/:id', markPointCtrl.updateMark);

export default router;