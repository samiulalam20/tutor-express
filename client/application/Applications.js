import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CompletedIcon from '@material-ui/icons/VerifiedUser'
import InProgressIcon from '@material-ui/icons/DonutLarge'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  gridList: {
    width: '100%',
    minHeight: 100,
    padding: '12px 0 10px'
  },
  tile: {
    textAlign: 'center',
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(160, 188, 245, 1)',
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
  },
  progress:{
    color: '#b4f8b4'
  }
}))

export default function Applications(props){
  const classes = useStyles()
    return (
      <div>
        <GridList cellHeight={120} className={classes.gridList} cols={4}>
          {props.applications.map((tuition, i) => (
            <GridListTile key={i} className={classes.tile}>
              <Link to={"/learn/"+tuition._id}>Applied on: {tuition.applied}</Link>
              <GridListTileBar className={classes.tileBar}
                title={<Link to={"/learn/"+tuition._id} className={classes.tileTitle}>{tuition.tuition}</Link>}
                
              />
            </GridListTile>
          ))}
        </GridList>
    </div>
    )
}

