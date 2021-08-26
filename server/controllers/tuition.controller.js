import Tuition from '../models/tuition.model'
import extend from 'lodash/extend'
import fs from 'fs'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let tuition = new Tuition(fields)
    tuition.guardian= req.profile
    if(files.image){
      tuition.image.data = fs.readFileSync(files.image.path)
      tuition.image.contentType = files.image.type
    }
    try {
      let result = await tuition.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

/**
 * Load tuition and append to req.
 */
const tuitionByID = async (req, res, next, id) => {
  try {
    let tuition = await Tuition.findById(id).populate('guardian', '_id name')
    if (!tuition)
      return res.status('400').json({
        error: "Tuition not found"
      })
    req.tuition = tuition
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve tuition"
    })
  }
}

const read = (req, res) => {
  req.tuition.image = undefined
  return res.json(req.tuition)
}

const list = async (req, res) => {
  try {
    let tuitions = await Tuition.find().select('name email updated created')
    res.json(tuitions)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }
    let tuition = req.tuition
    tuition = extend(tuition, fields)
    if(fields.lessons){
      tuition.lessons = JSON.parse(fields.lessons)
    }
    tuition.updated = Date.now()
    if(files.image){
      tuition.image.data = fs.readFileSync(files.image.path)
      tuition.image.contentType = files.image.type
    }
    try {
      await tuition.save()
      res.json(tuition)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const newLesson = async (req, res) => {
  try {
    let lesson = req.body.lesson
    let result = await Tuition.findByIdAndUpdate(req.tuition._id, {$push: {lessons: lesson}, updated: Date.now()}, {new: true})
                            .populate('guardian', '_id name')
                            .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let tuition = req.tuition
    let deleteTuition = await tuition.remove()
    res.json(deleteTuition)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isGuardian = (req, res, next) => {
    const isGuardian = req.tuition && req.auth && req.tuition.guardian._id == req.auth._id
    if(!isGuardian){
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
}

const listByGuardian = (req, res) => {
  Tuition.find({guardian: req.profile._id}, (err, tuitions) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(tuitions)
  }).populate('guardian', '_id name')
}

const listPosted = (req, res) => {
  Tuition.find({posted: true}, (err, tuitions) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(tuitions)
  }).populate('guardian', '_id name')
}

const photo = (req, res, next) => {
  if(req.tuition.image.data){
    res.set("Content-Type", req.tuition.image.contentType)
    return res.send(req.tuition.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+defaultImage)
}


export default {
  create,
  tuitionByID,
  read,
  list,
  remove,
  update,
  isGuardian,
  listByGuardian,
  photo,
  defaultPhoto,
  newLesson,
  listPosted
}
