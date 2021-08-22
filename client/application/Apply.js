import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import {create} from './api-application'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import { CardContent } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 500,
        maxWidth: 600,
    margin: 'auto',
    textAlign: 'center'
    }
}))

export default function Apply(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    tutorName:'',
    tutorPhoneNum:'',
    tutorLocation:'',
    gender:'',
    schoolCur:'',
    collegeCur:'',
    studyBg:'',
    universityName:'',
    major:'',
    enrollmentId: '',
    error: '',
    redirect: false
  })
  
  const jwt = auth.isAuthenticated()
  const clickApply = () => {
    let applicationData = new FormData()
    values.tutorName && applicationData.append('tutorName', values.tutorName)
    values.tutorPhoneNum && applicationData.append('tutorPhoneNum', values.tutorPhoneNum)
    values.tutorLocation && applicationData.append('tutorLocation', values.tutorLocation)
    values.gender && applicationData.append('gender', values.gender)
    values.schoolCur && applicationData.append('schoolCur', values.schoolCur)
    values.collegeCur && applicationData.append('collegeCur', values.collegeCur)
    values.studyBg && applicationData.append('studyBg', values.studyBg)
    values.universityName && applicationData.append('universityName', values.universityName)
    values.major && applicationData.append('major', values.major)
    create({
      tuitionId: props.tuitionId
    }, {
      t: jwt.token
    },  applicationData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, applicationId: data._id, redirect: true})
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }

    if(values.redirect){
        return (<Redirect to={'/learn/'+values.applicationId}/>)
    }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New Application
          </Typography>
          <br/>
          
          <TextField id="tutorName" label="Name" className={classes.textField} value={values.tutorName} onChange={handleChange('tutorName')} margin="normal"/><br/>
          <TextField id="tutorPhoneNum" label="Phone Number" className={classes.textField} value={values.tutorPhoneNum} onChange={handleChange('tutorPhoneNum')} margin="normal"/><br/>
          <TextField id="tutorLocation" label="Present Location" className={classes.textField} value={values.tutorLocation} onChange={handleChange('tutorLocation')} margin="normal"/><br/>
          <TextField id="name" label="Gender" className={classes.textField} value={values.gender} onChange={handleChange('gender')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="School Curriculum"
            multiline
            rows="2"
            value={values.schoolCur}
            onChange={handleChange('schoolCur')}
            className={classes.textField}
            margin="normal"
          /><br/> 
          <TextField id="collegeCur" label="College Curriculam" className={classes.textField} value={values.collegeCur} onChange={handleChange('collegeCur')} margin="normal"/><br/>
          <TextField id="studyBg" label="Background of Study" className={classes.textField} value={values.studyBg} onChange={handleChange('studyBg')} margin="normal"/><br/>
          <TextField id="universityName" label="Name of University" className={classes.textField} value={values.universityName} onChange={handleChange('universityName')} margin="normal"/><br/>
          <TextField id="major" label="Major" className={classes.textField} value={values.major} onChange={handleChange('major')} margin="normal"/><br/>
          
      <Button variant="contained" color="secondary" onClick={clickApply}> Apply </Button>
      </CardContent>
      </Card>
      </div>
  )
}

Apply.propTypes = {
  tuitionId: PropTypes.string.isRequired
}
