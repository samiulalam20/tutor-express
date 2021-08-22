import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import NewTuition from './tuition/NewTuition'
//import Courses from './course/Courses'
import Tuition from './tuition/Tuition'
import EditTuition from './tuition/EditTuition'
import MyTuitions from './tuition/MyTuitions'
import Application from './application/Application'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/tuition/:tuitionId" component={Tuition}/>
        <PrivateRoute path="/teach/tuitions" component={MyTuitions}/>
        
        <PrivateRoute path="/teach/tuition/new" component={NewTuition}/>
        <PrivateRoute path="/teach/tuition/edit/:tuitionId" component={EditTuition}/>
        <PrivateRoute path="/teach/tuition/:tuitionId" component={Tuition}/>
        <PrivateRoute path="/learn/:applicationId" component={Application}/>

      </Switch>
    </div>)
}

export default MainRouter
