import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import {Link} from 'react-router-dom'
import auth from './../auth/auth-helper'
import Apply from './../application/Apply'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  gridList: {
    width: '50%',
    minHeight: 200,
    padding: '16px 0 0px'
  },
  tile: {
    textAlign: 'center',
    border: '1px solid #cecece',
    backgroundColor:'#04040c'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize:'1.1em',
    marginBottom:'5px',
    color:'#fffde7',
    display:'block'
  },
  action:{
    margin: '0 10px'
  }
}))

export default function Tuitions(props){
  const classes = useStyles()
  const findCommon = (tuition) => {
    return !props.common.find((applied)=>{return applied.tuition._id == tuition._id})
  }
    return (
        <GridList cellHeight={200} className={classes.gridList} cols={1}>
          {props.tuitions.map((tuition, i) => {
            return (
            findCommon(tuition) &&
              <GridListTile className={classes.tile} key={i} style={{padding:0}}>
                <Link to={"/tuition/"+tuition._id}><img className={classes.image} src={'/api/tuitions/photo/'+tuition._id} alt={tuition.name} /></Link>
                <GridListTileBar className={classes.tileBar}
                  title={<Link to={"/tuition/"+tuition._id} className={classes.tileTitle}>Need Tutor for {tuition.studentClass} Student</Link>}
                  subtitle={<span>{tuition.category}</span>}
                  actionIcon={
                    <div className={classes.action}>
                    {auth.isAuthenticated() ? <Button color="primary" variant="outlined">View to Apply</Button> : <Link to="/signin">Sign in to Apply</Link>}
                    </div>
                  }
                />
              </GridListTile>)
              }
          )}
        </GridList>
    )
}

Tuitions.propTypes = {
  tuitions: PropTypes.array.isRequired
}