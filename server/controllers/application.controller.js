import Application from '../models/application.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'

const create = (req, res) => {
  let newApplication = new formidable.IncomingForm()
  newApplication.keepExtensions = true
  newApplication.parse(req, async (err, fields) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    
    let newApplication = {
      ...fields,
          tuition: req.tuition,
          tutor: req.auth,
        }
        newApplication.lessonStatus = req.tuition.lessons.map((lesson)=>{
          return {lesson: lesson, complete:false}
        })
        const application = new Application(newApplication)
    
    try {
      let result = await application.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}


/**
 * Load enrollment and append to req.
 */
const applicationByID = async (req, res, next, id) => {
  try {
    let application = await Application.findById(id)
                                    .populate({path: 'tuition', populate:{ path: 'guardian'}})
                                    .populate('tutor', '_id name')
    if (!application)
      return res.status('400').json({
        error: "Application not found"
      })
    req.application = application
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve application"
    })
  }
}

const read = (req, res) => {
  console.log(req.application)
  return res.json(req.application)
}

const complete = async (req, res) => {
  let updatedData = {}
  updatedData['lessonStatus.$.complete']= req.body.complete 
  updatedData.updated = Date.now()
  if(req.body.tuitionCompleted)
    updatedData.completed = req.body.tuitionCompleted

    try {
      let application = await Application.updateOne({'lessonStatus._id':req.body.lessonStatusId}, {'$set': updatedData})
      res.json(application)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const remove = async (req, res) => {
  try {
    let application = req.application
    let deletedApplication = await application.remove()
    res.json(deletedApplication)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isTutor = (req, res, next) => {
  const isTutor = req.auth && req.auth._id == req.application.tutor._id
  if (!isTutor) {
    return res.status('403').json({
      error: "User is not applied"
    })
  }
  next()
}

const listApplied = async (req, res) => {
  try {
    let applications = await Application.find({tutor: req.auth._id}).sort({'completed': 1}).populate('tution', '_id name category')
    res.json(applications)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const findApplication = async (req, res, next) => {
  try {
    let applications = await Application.find({tuition:req.tuition._id, tutor: req.auth._id})
    if(applications.length == 0){
      next()
    }else{
      res.json(applications[0])
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const applicationStats = async (req, res) => {
  try {
    let stats = {}
    stats.totalApplied = await Application.find({tuition:req.tuition._id}).countDocuments()
    stats.applications = await Application.find({tuition:req.tuition._id})
    stats.totalCompleted = await Application.find({tuition:req.tuition._id}).exists('completed', true).countDocuments()
      res.json(stats)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
} 

export default {
  create,
  applicationByID,
  read,
  remove,
  complete,
  isTutor,
  listApplied,
  findApplication,
  applicationStats
}
