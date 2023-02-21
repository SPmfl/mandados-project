import Router from 'express';
import * as operatorCtrl from '../../controllers/operatorControllers.js';
import passport from 'passport';
import verifyRol from '../../middlewares/verifyRol.js';

const router = Router();

router.get('/profile', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], operatorCtrl.getInfo);
router.put('/profile', [passport.authenticate('jwt', { session: false }),verifyRol.verifyOperator], operatorCtrl.updateInfo);

export default router;