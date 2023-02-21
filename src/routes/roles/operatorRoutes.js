import Router from 'express';
// import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as operatorCtrl from '../../controllers/operatorControllers.js';
import passport from 'passport';
import verifyRol from '../../middlewares/verifyRol.js';

const router = Router();

router.get('/profile', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], operatorCtrl.getInfo);
router.put('/profile', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], operatorCtrl.updateInfo);

// router.get('/marks', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], markPointCtrl.getAllMarks);
// router.get('/marks/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], markPointCtrl.getMark);
// router.post('/marks/', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], markPointCtrl.createMark);
// router.delete('/marks', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], markPointCtrl.deleteMark);
// router.put('/marks/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], markPointCtrl.updateMark);

export default router;