import Router from 'express';
import * as adminCtrl from '../../controllers/adminControllers.js';
import passport from 'passport';
import verifyRol from '../../middlewares/verifyRol.js';

const router = Router();

router.get('/operators', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.getAllOperators);
router.get('/operators/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.getOperator);
router.post('/operators', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.createOperator);
router.delete('/operators/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.deleteOperator);
router.put('/operators/:id', [passport.authenticate('jwt', { session: false }),verifyRol.verifyAdmin], adminCtrl.updateOperator);


export default router;