import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as operatorCtrl from '../../controllers/operatorControllers.js';
import verifyToken from '../../middlewares/verifyToken.js';


const router = Router();

router.get('/info', verifyToken, operatorCtrl.getInfo);
router.put('/info', verifyToken, operatorCtrl.updateInfo);

router.get('/marks', verifyToken, markPointCtrl.getAllMarks);
router.get('/marks/:id', verifyToken, markPointCtrl.getMark);
router.post('/marks/', verifyToken, markPointCtrl.createMark);
router.delete('/marks/:id', verifyToken, markPointCtrl.deleteMark);
router.put('/marks/:id', verifyToken, markPointCtrl.updateMark);

export default router;