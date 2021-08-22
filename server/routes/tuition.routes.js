import express from 'express'
import tuitionCtrl from '../controllers/tuition.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/tuitions/posted')
  .get(tuitionCtrl.listPosted)

router.route('/api/tuitions/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isParent, tuitionCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, tuitionCtrl.listByGuardian)

router.route('/api/tuitions/photo/:tuitionId')
  .get(tuitionCtrl.photo, tuitionCtrl.defaultPhoto)

router.route('/api/tuitions/defaultphoto')
  .get(tuitionCtrl.defaultPhoto)

router.route('/api/tuitions/:tuitionId/lesson/new')
  .put(authCtrl.requireSignin, tuitionCtrl.isGuardian, tuitionCtrl.newLesson)

router.route('/api/tuitions/:tuitionId')
  .get(tuitionCtrl.read)
  .put(authCtrl.requireSignin, tuitionCtrl.isGuardian, tuitionCtrl.update)
  .delete(authCtrl.requireSignin, tuitionCtrl.isGuardian, tuitionCtrl.remove)

router.param('tuitionId', tuitionCtrl.tuitionByID)
router.param('userId', userCtrl.userByID)

export default router
