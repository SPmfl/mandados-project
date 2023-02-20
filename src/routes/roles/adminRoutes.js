import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as adminCtrl from '../../controllers/adminControllers.js';
import passport from 'passport';
import verifyRol from '../../middlewares/verifyRol.js';

const router = Router();

router.get('/operators', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.getAllOperators);
router.get('/operators/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.getOperator);
router.post('/operators', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.createOperator);
router.delete('/operators/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.deleteOperator);
router.put('/operators/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.updateOperator);

router.get('/marks', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], markPointCtrl.getAllMarks);
router.get('/marks/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], markPointCtrl.getMark);
router.post('/marks', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], markPointCtrl.createMark);
router.delete('/marks', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], markPointCtrl.deleteMark);
router.put('/marks/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], markPointCtrl.updateMark);


export default router;