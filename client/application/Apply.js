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
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import { InputLabel } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { Select } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    card: {
      width: 700,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(12),
      paddingBottom: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
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

  const location= [
    'Uttara Sector-1, Dhaka',
        'Bashundhara Block-B, Dhaka',
        'Baridhara DOHS, Dhaka',
        'Gulshan-2, Dhaka',
        'Banani, Dhaka',
        'Dhaka Cantonment, Dhaka',
        'Mirpur-10, Dhaka',
        'Dhanmondi, Dhaka',
  ]

  const uniName= [
    'Independent University Bangladesh (IUB)',
        'North South University (NSU)',
        'BUET',
        'Dhaka University (DU)',
        'East West University (EWU)',
        'MIST',
        'BUP',
        'United International University (UIU)',
        'Brac University'
  ]

  const maj= [
    'Computer Science and Engineering (CSE)',
        'EEE',
        'BBA in Marketing',
        'BBA in Finance',
        'BBA in Accounting',
        'Pharma',
        'Chemical Engineering',
        'Mechanical Engineering',
        'Biochemistry'
  ]

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
          

          <FormControl className={classes.formControl}>
        <InputLabel id="tutorLocation">Present Location</InputLabel>
          <Select
          className={classes.textField}
          labelId="tutorLocation"
          id="tutorLocation"
          value={values.tutorLocation}
          onChange={handleChange('tutorLocation')}
          input={<Input id="tutorLocation" />}
          >
          {location.map((tutorLocation) => (
            <MenuItem key={tutorLocation} value={tutorLocation} >
              {tutorLocation}
            </MenuItem>
          ))}


        </Select>
      </FormControl>
          
          <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="Gender" name="gender" value={values.gender} onChange={handleChange('gender')}>
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl><br/>

      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">School Curriculum</FormLabel>
        <RadioGroup aria-label="School Curriculum" name="schoolCur" value={values.schoolCur} onChange={handleChange('schoolCur')}>
        <FormControlLabel value="English Medium" control={<Radio />} label="English Medium" />
        <FormControlLabel value="Bangla Medium" control={<Radio />} label="Bangla Medium" />
        <FormControlLabel value="English Version" control={<Radio />} label="English Version" />
        </RadioGroup>
      </FormControl><br/>

      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">College Curriculum</FormLabel>
        <RadioGroup aria-label="College Curriculum" name="collegeCur" value={values.collegeCur} onChange={handleChange('collegeCur')}>
        <FormControlLabel value="English Medium" control={<Radio />} label="English Medium" />
        <FormControlLabel value="Bangla Medium" control={<Radio />} label="Bangla Medium" />
        <FormControlLabel value="English Version" control={<Radio />} label="English Version" />
        </RadioGroup>
      </FormControl><br/>

      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Background of Study</FormLabel>
        <RadioGroup aria-label="Background of Study" name="studyBg" value={values.studyBg} onChange={handleChange('studyBg')}>
        <FormControlLabel value="Science" control={<Radio />} label="Science" />
        <FormControlLabel value="Commerce" control={<Radio />} label="Commerce" />
        </RadioGroup>
      </FormControl><br/>

      <FormControl className={classes.formControl}>
        <InputLabel id="universityName">Name of University</InputLabel>
          <Select
          className={classes.textField}
          labelId="universityName"
          id="universityName"
          value={values.universityName}
          onChange={handleChange('universityName')}
          input={<Input id="universityName" />}
          >
          {uniName.map((universityName) => (
            <MenuItem key={universityName} value={universityName} >
              {universityName}
            </MenuItem>
          ))}


        </Select>
      </FormControl>
          
      <FormControl className={classes.formControl}>
        <InputLabel id="major">Major Subject</InputLabel>
          <Select
          className={classes.textField}
          labelId="major"
          id="major"
          value={values.major}
          onChange={handleChange('major')}
          input={<Input id="major" />}
          >
          {maj.map((major) => (
            <MenuItem key={major} value={major} >
              {major}
            </MenuItem>
          ))}


        </Select>
      </FormControl>
          
      <Button variant="contained" color="secondary" onClick={clickApply}> Apply </Button>
      </CardContent>
      </Card>
      </div>
  )
}

Apply.propTypes = {
  tuitionId: PropTypes.string.isRequired
}
