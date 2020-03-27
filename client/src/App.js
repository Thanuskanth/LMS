import React,{Component} from 'react';
import './App.css';
import Navbar from './Components/navbar.component';
import SideNavbar from './Components/sidenav.component';
import Listuser from './Components/user/listUser.component';
import Profile from './Components/user/profile.componenant';
import ListLeave from './Components/leave/listuserleave.component';
import Leave from './Components/leave/listLeave.component';
import Listrole from './Components/role/listrole';
import store from '../src/store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {loadseeder} from './actions/authaction'
import {connect} from 'react-redux'
class  App extends Component {
 componentDidMount(){
loadseeder()
 }
  render(){
  return (
    <Provider store={store}>
      <Router	>
    <div className="App">
    
          
      <Navbar />
       <SideNavbar />
     
      <div className="sidenavcontant">
      
         <Route path="/user" exact component={Listuser}/>
          <Route path="/role" exact  component={Listrole}/>
          <Route path="/myleave" exact  component={ListLeave}/>
          <Route path="/leave" exact  component={Leave}/>
          <Route path="/profile" exact  component={Profile}/>

      </div>
    </div>
    </Router>
    </Provider>
  );
}
}

export default  (App);
