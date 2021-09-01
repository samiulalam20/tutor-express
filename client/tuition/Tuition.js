import React, {useState, useEffect}  from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import PeopleIcon from '@material-ui/icons/Group'
import CompletedIcon from '@material-ui/icons/VerifiedUser'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import {read, update} from './api-tuition'
import {applicationStats} from './../application/api-application'
import {Link, Redirect} from 'react-router-dom'
import auth from './../auth/auth-helper'
import DeleteTuition from './DeleteTuition'
import Divider from '@material-ui/core/Divider'
import NewLesson from './NewLesson'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Apply from './../application/Apply'
import userModel from '../../server/models/user.model.js'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 800,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(12)
      }),
  flex:{
    display:'flex',
    marginBottom: 20
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '10px',
    color: theme.palette.openTitle
  },
  details: {
    margin: '16px',
  },
  sub: {
    display: 'block',
    margin: '3px 0px 5px 0px',
    fontSize: '0.9em'
  },
  media: {
    height: 100,
    display: 'inline-block',
    width: '50%',
    marginLeft: '16px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  category:{
    color: '#5c5c5c',
    fontSize: '0.9em',
    padding: '3px 5px',
    backgroundColor: '#dbdbdb',
    borderRadius: '0.2em',
    marginTop: 5
  },
  action: {
    margin: '10px 0px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  statSpan: {
    margin: '7px 10px 0 10px',
    alignItems: 'center',
    color: '#616161',
    display: 'inline-flex',
    '& svg': {
      marginRight: 10,
      color: '#b6ab9a'
    }
  },
  enroll:{
    float: 'right'
  }
}))

export default function Tuition ({match}) {
  const classes = useStyles()
  const [stats, setStats] = useState({})
  const [tuition, setTuition] = useState({guardian:{}})
  const [values, setValues] = useState({
      redirect: false,
      error: ''
    })
  const [open, setOpen] = useState(false)
  const jwt = auth.isAuthenticated()
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      read({tuitionId: match.params.tuitionId}, signal).then((data) => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setTuition(data)
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.tuitionId])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    applicationStats({tuitionId: match.params.tuitionId}, {t:jwt.token}, signal).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        console.log("data", data)
        setStats(data)
        
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [match.params.tuitionId])
  console.log("stats",stats)
  const removeTuition = (tuition) => {
    setValues({...values, redirect:true})
  }
  const addLesson = (tuition) => {
    setTuition(tuition)
  }
  const clickPost = () => {
    if(tuition.lessons.length > 0){    
      setOpen(true)
    }
  }
  const post = () => {
    let tuitionData = new FormData()
      tuitionData.append('posted', true)
      update({
          tuitionId: match.params.tuitionId
        }, {
          t: jwt.token
        }, tuitionData).then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
            setTuition({...tuition, posted: true})
            setOpen(false)
          }
      })
  }
  const handleClose = () => {
    setOpen(false)
  }
  if (values.redirect) {
    return (<Redirect to={'/teach/tuitions'}/>)
  }
    const imageUrl = tuition._id
          ? `/api/tuitions/photo/${tuition._id}?${new Date().getTime()}`
          : '/api/tuitions/defaultphoto'
    return (
        <div className={classes.root}>
              <Card className={classes.card}>
                <CardHeader
                  title={tuition.name}
                  subheader={<div>
                        <span className={classes.sub}>By {tuition.guardian.name}</span>
                        <span className={classes.category}>{tuition.category}</span>
                      </div>
                    }
                  action={<>
             {auth.isAuthenticated().user && auth.isAuthenticated().user._id == tuition.guardian._id &&
                (<span className={classes.action}>
                  <Link to={"/teach/tuition/edit/" + tuition._id}>
                    <IconButton aria-label="Edit" color="secondary">
                      <Edit/>
                    </IconButton>
                  </Link>
                {!tuition.posted ? (<>
                  <Button color="secondary" variant="outlined" onClick={clickPost}>{tuition.lessons.length == 0 ? "Add address to post" : "Post"}</Button>
                  <DeleteTuition tuition={tuition} onRemove={removeTuition}/>
                </>) 
                : (
                  <Button color="primary" variant="outlined">Posted</Button>
                )
                }
                </span>)
             }
                {tuition.posted && (<div>
                  <span className={classes.statSpan}><PeopleIcon /> {stats.totalApplied} applied </span>
                  
                  

                  </div>
                  )}
                {console.log(stats)}
                </>
            }
                />
                <div className={classes.flex}>
                  <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title={tuition.name}
                  />
                  <div className={classes.details}>
                    <Typography variant="body1" className={classes.subheading}>
                        Class: {tuition.studentClass}<br/>
                    </Typography>
                    <Typography variant="body1" className={classes.subheading}>
                        Tutor Gender Preference: {tuition.tutorGenderRequired}<br/>
                    </Typography>
                    <Typography variant="body1" className={classes.subheading}>
                        Subjects: {tuition.subjects}<br/>
                    </Typography>
                    <Typography variant="body1" className={classes.subheading}>
                        Location: {tuition.location}<br/>
                    </Typography>
                    <Typography variant="body1" className={classes.subheading}>
                        Number of Days/Week: {tuition.numberOfdays} Days<br/>
                    </Typography>
                    <Typography variant="body1" className={classes.subheading}>
                        Salary: {tuition.salary} BDT<br/>
                    </Typography>
                    <Typography variant="body1" className={classes.subheading}>
                        Description: {tuition.description}<br/>
                    </Typography>
                    
                    
              {tuition.posted && auth.isAuthenticated().user && auth.isAuthenticated().user._id !== tuition.guardian._id &&<div className={classes.enroll}><Apply tuitionId={tuition._id}/></div>} 
                    
                    
                  </div>
                </div>
                <Divider/>

                
              <Card className={classes.card}>
                <CardHeader
                  title={tuition.studentClass}
                  
                  action={<>
             {auth.isAuthenticated().user && auth.isAuthenticated().user._id == tuition.guardian._id &&
                (<span className={classes.action}>
                  
                    
                  
                {!tuition.posted ? (<>
                  
                  
                </>) 
                : (
                  <Button color="primary" variant="outlined">Applications</Button>
                )
                }
                </span>)
             }
                {tuition.posted && auth.isAuthenticated().user && auth.isAuthenticated().user._id == tuition.guardian._id &&
                  (<div>
                    <span className={classes.statSpan}><PeopleIcon /> {stats.totalApplied} applied </span>
                    {stats.applications && stats.applications.map((appl)=>{
                      return (
                        <>
                        <List className={classes.root}>
                          <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                          <Avatar  />
                          </ListItemAvatar>
                            <ListItemText>
                        <Typography variant="body1" className={classes.subheading}>
                          Name: {appl.tutorName}
                          </Typography>
                          <br/>
                  <Typography variant="body1" className={classes.subheading}>
                          Gender: {appl.gender}
                      </Typography>
                  <br/>
                  <Typography variant="body1" className={classes.subheading}>
                          School Curriculum: {appl.schoolCur}
                      </Typography>
                      <br/>
                      <Typography variant="body1" className={classes.subheading}>
                          College Curriculum: {appl.collegeCur}
                      </Typography>
                      <br/>
                      <Typography variant="body1" className={classes.subheading}>
                          Background of Study: {appl.studyBg}
                      </Typography>
                      <br/>
                      <Typography variant="body1" className={classes.subheading}>
                          Name of University: {appl.universityName}
                      </Typography>
                      <br/>
                      <Typography variant="body1" className={classes.subheading}>
                          Major Subject: {appl.major}
                      </Typography>
                      <br/>
                      <Typography variant="body1" className={classes.subheading}>
                          Present Location: {appl.tutorLocation}
                      </Typography>
                      <br/>
                      <Typography variant="body1" className={classes.subheading}>
                          Contact Number: {appl.tutorPhoneNum}
                      </Typography>
                      <br/>
                  <Divider />
                  </ListItemText>
                  </ListItem>
                  </List>
                  </>
                  
                      )
                                   
                                         })}
                    
                      
                    </div>)
                }
                
                </>
            }
                />

</Card>
                <div>
                <CardHeader
                  
                
                  
                  action={
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == tuition.guardian._id && !tuition.posted &&
                (<span className={classes.action}>
                  <NewLesson tuitionId={tuition._id} addLesson={addLesson}/>
                </span>)
            }
                />
                
                </div>
              </Card>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Post Tuition</DialogTitle>
                <DialogContent>
                  <Typography variant="body1">Posting your tuition will not reveal your address. </Typography><Typography variant="body1">Are you sure you want to publish?</Typography></DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                  Cancel
                </Button>
                <Button onClick={post} color="secondary" variant="contained">
                  Post
                </Button>
              </DialogActions>
             </Dialog>   
        </div>)
}
