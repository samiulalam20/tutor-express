import express from 'express'
import applicationCtrl from '../controllers/application.controller'
import tuitionCtrl from '../controllers/tuition.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/application/applied')
  .get(authCtrl.requireSignin, applicationCtrl.listApplied)

router.route('/api/application/new/:tuitionId')
  .post(authCtrl.requireSignin, applicationCtrl.findApplication, applicationCtrl.create)  

router.route('/api/application/stats/:tuitionId')
  .get(applicationCtrl.applicationStats)

router.route('/api/application/complete/:applicationId')
  .put(authCtrl.requireSignin, applicationCtrl.isTutor, applicationCtrl.complete) 

router.route('/api/application/:applicationId')
  .get(authCtrl.requireSignin, applicationCtrl.isTutor, applicationCtrl.read)
  .delete(authCtrl.requireSignin, applicationCtrl.isTutor, applicationCtrl.remove)

router.param('tuitionId', tuitionCtrl.tuitionByID)
router.param('applicationId', applicationCtrl.applicationByID)

export default router
