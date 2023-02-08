import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as adminCtrl from '../../controllers/adminControllers.js';
import verifyToken from '../../middlewares/verifyToken.js';

const router = Router();

router.get('/operators', verifyToken, adminCtrl.getAllOperators);
router.get('/operators/:id', verifyToken, adminCtrl.getOperator);
router.post('/operators', verifyToken, adminCtrl.createOperator);
router.delete('/operators/:id', verifyToken, adminCtrl.deleteOperator);
router.put('/operators/:id', verifyToken, adminCtrl.updateOperator);

router.get('/marks', verifyToken, markPointCtrl.getAllMarks);
router.get('/marks/:id', verifyToken, markPointCtrl.getMark);
router.post('/marks', verifyToken, markPointCtrl.createMark);
router.delete('/marks/:id', verifyToken, markPointCtrl.deleteMark);
router.put('/marks/:id', verifyToken, markPointCtrl.updateMark);

export default router;