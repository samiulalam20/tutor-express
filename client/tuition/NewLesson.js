import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Add from '@material-ui/icons/AddBox'
import {makeStyles} from '@material-ui/core/styles'
import {newLesson} from './api-tuition'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500
    }
}))

export default function NewLesson(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState({
    
    
      house:'',
      street:'',
      city:''
    
  })
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }


  const clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const lesson = {
      
      
        house:values.house || undefined,        
        street:values.street || undefined,
        city:values.city|| undefined
      
    }
    newLesson({
      tuitionId: props.tuitionId
    }, {
      t: jwt.token
    }, lesson).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
          props.addLesson(data)
          setValues({...values, house: '',
          street: '',
          city: ''})
          setOpen(false)
      }
    })
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button aria-label="Add Lesson" color="primary" variant="contained" onClick={handleClickOpen}>
        <Add/> &nbsp; Address
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <div className={classes.form}>
        <DialogTitle id="form-dialog-title">Add Address</DialogTitle>
        <DialogContent>
          
          
          <TextField
            margin="dense"
            label="House"
            type="text"
            fullWidth
            value={values.house} onChange={handleChange('house')}
          /><br/>
          <TextField
            margin="dense"
            label="Street"
            type="text"
            fullWidth
            value={values.street} onChange={handleChange('street')}
          /><br/>
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={values.city} onChange={handleChange('city')}
          /><br/>
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained">
            Add
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
NewLesson.propTypes = {
    tuitionId: PropTypes.string.isRequired,
    addLesson: PropTypes.func.isRequired
  }