import Router from 'express';
import * as markPointCtrl from '../../controllers/markPointControllers.js';
import * as operatorCtrl from '../../controllers/operatorControllers.js';
import passport from 'passport';


const router = Router();

router.get('/info', passport.authenticate('jwt', { session: false }), operatorCtrl.getInfo);
router.put('/info', passport.authenticate('jwt', { session: false }), operatorCtrl.updateInfo);

router.get('/marks', passport.authenticate('jwt', { session: false }), markPointCtrl.getAllMarks);
router.get('/marks/:id', passport.authenticate('jwt', { session: false }), markPointCtrl.getMark);
router.post('/marks/', passport.authenticate('jwt', { session: false }), markPointCtrl.createMark);
router.delete('/marks', passport.authenticate('jwt', { session: false }), markPointCtrl.deleteMark);
router.put('/marks/:id', passport.authenticate('jwt', { session: false }), markPointCtrl.updateMark);

export default router;