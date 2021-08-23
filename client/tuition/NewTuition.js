import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import auth from './../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-tuition.js'
import {Link, Redirect} from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}))

export default function NewTuition() {
  const classes = useStyles()
  const [values, setValues] = useState({
      name: '',
      description: '',
      image: '',
      category: '',
      educationBg: '',
      studentClass: '',
      image: '',
      category: '',
      tutorGenderRequired: '',
      subjects: [],
      location: [],
      numberOfdays: '',
      salary: '',
      redirect: false,
      error: ''
  })

  const subjects= [
    'English Language',
        'Bangla',
        'Mathematics',
        'Science',
        'English Literature',
        'Geography',
        'History',
        'Religious Studies',
        'Social Studies',
        'ICT'
  ]

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

  const studentClass= [
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'SSC',
    'HSC',
    'O level (Edexcel)',
    'O level (Cambridge)',
    'A level (Edexcel)',
    'A level (Cambridge)'
  ]


  const jwt = auth.isAuthenticated()

  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
  }

  

  const clickSubmit = () => {
    let tuitionData = new FormData()
    values.name && tuitionData.append('name', values.name)
    values.description && tuitionData.append('description', values.description)
    values.image && tuitionData.append('image', values.image)
    values.category && tuitionData.append('category', values.category)
    values.studentClass && tuitionData.append('studentClass', values.studentClass)
    values.image && tuitionData.append('image', values.image)
    values.category && tuitionData.append('category', values.category)
    values.subjects && tuitionData.append('subjects', values.subjects)
    values.tutorGenderRequired && tuitionData.append('tutorGenderRequired', values.tutorGenderRequired)
    values.location && tuitionData.append('location', values.location)
    values.numberOfdays && tuitionData.append('numberOfdays', values.numberOfdays)
    values.salary && tuitionData.append('salary', values.salary)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, tuitionData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirect: true})
      }
    })
  }

    if (values.redirect) {
      return (<Redirect to={'/teach/tuitions'}/>)
    }
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New Tuition
          </Typography>
          <br/>
          <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Photo
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br/>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/> 
          
          <FormControl className={classes.formControl}>
        <InputLabel id="studentClass">Class of the Student</InputLabel>
          <Select
          className={classes.textField}
          labelId="studentClass"
          id="studentClass"
          value={values.studentClass}
          onChange={handleChange('studentClass')}
          input={<Input id="studentClass" />}
          >
            {studentClass.map((studentClass) => (
            <MenuItem key={studentClass} value={studentClass} >
              {studentClass}
            </MenuItem>
          ))}


        </Select>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Category</FormLabel>
        <RadioGroup aria-label="Category" name="category" value={values.category} onChange={handleChange('category')}>
        <FormControlLabel value="English Medium" control={<Radio />} label="English Medium" />
        <FormControlLabel value="Bangla Medium" control={<Radio />} label="Bangla Medium" />
        <FormControlLabel value="English Version" control={<Radio />} label="English Version" />
        </RadioGroup>
      </FormControl>
        
      <FormControl className={classes.formControl}>
        <InputLabel id="subjects">Subjects</InputLabel>
        <Select
          labelId="subjects"
          id="subjects"
          multiple
          value={values.subjects}
          onChange={handleChange('subjects')}
          input={<Input id="subjects" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          
        >
          {subjects.map((subjects) => (
            <MenuItem key={subjects} value={subjects} >
              {subjects}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Tutor Gender Preference</FormLabel>
        <RadioGroup aria-label="Tutor Gender Preference" name="tutorGenderRequired" value={values.tutorGenderRequired} onChange={handleChange('tutorGenderRequired')}>
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="location">Location</InputLabel>
          <Select
          className={classes.textField}
          labelId="location"
          id="location"
          value={values.location}
          onChange={handleChange('location')}
          input={<Input id="location" />}
          >
          {location.map((location) => (
            <MenuItem key={location} value={location} >
              {location}
            </MenuItem>
          ))}


        </Select>
      </FormControl>

          
          <FormControl className={classes.formControl}>
        <InputLabel id="numberOfdays">Number of Days per Week</InputLabel>
          <Select
          className={classes.textField}
          labelId="numberOfdays"
          id="numberOfdays"
          value={values.numberOfdays}
          onChange={handleChange('numberOfdays')}
          >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl>

          
          <TextField id="salary" label="Salary" className={classes.textField} value={values.salary} onChange={handleChange('salary')} margin="normal"/><br/>

          {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
          <Link to='/teach/tuitions' className={classes.submit}><Button variant="contained">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
}
