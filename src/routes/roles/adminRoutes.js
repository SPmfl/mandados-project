import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as adminCtrl from '../../controllers/adminControllers.js';
import passport from 'passport';

const router = Router();

router.get('/operators', passport.authenticate('jwt', { session: false }), adminCtrl.getAllOperators);
router.get('/operators/:id', passport.authenticate('jwt', { session: false }), adminCtrl.getOperator);
router.post('/operators', passport.authenticate('jwt', { session: false }), adminCtrl.createOperator);
router.delete('/operators/:id', passport.authenticate('jwt', { session: false }), adminCtrl.deleteOperator);
router.put('/operators/:id', passport.authenticate('jwt', { session: false }), adminCtrl.updateOperator);

router.get('/marks', passport.authenticate('jwt', { session: false }), markPointCtrl.getAllMarks);
router.get('/marks/:id', passport.authenticate('jwt', { session: false }), markPointCtrl.getMark);
router.post('/marks', passport.authenticate('jwt', { session: false }), markPointCtrl.createMark);
router.delete('/marks', passport.authenticate('jwt', { session: false }), markPointCtrl.deleteMark);
router.put('/marks/:id', passport.authenticate('jwt', { session: false }), markPointCtrl.updateMark);

export default router;