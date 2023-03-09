import Router from 'express';
import verifyRol from '../../middlewares/verifyRol.js';
import markPointCtrl from '../../controllers/markPointControllers.js'
import passport from 'passport';

const router = Router();


router.get('/', [passport.authenticate('jwt', { session: false }), verifyRol.verifyOperator], markPointCtrl.getAllMarks);
router.get('/:id', [passport.authenticate('jwt', { session: false }), verifyRol.verifyOperator], markPointCtrl.getMark);
router.post('/', [passport.authenticate('jwt', { session: false }), verifyRol.verifyOperator], markPointCtrl.createMark);
router.delete('/', [passport.authenticate('jwt', { session: false }), verifyRol.verifyOperator], markPointCtrl.deleteMark);
router.put('/:id', [passport.authenticate('jwt', { session: false }), verifyRol.verifyOperator], markPointCtrl.updateMark);

export default router;