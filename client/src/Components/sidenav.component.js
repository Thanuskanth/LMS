import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getuser } from '../actions/authaction';
import { getLeave } from '../actions/leaveaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route } from "react-router-dom";
const toggle = () => this.setState({
  isOpen: !this.state.isOpen
});
class Navbarcomponent extends Component {
  state = {
    isOpen: false,count:null
  }
 componentDidMount(){
this.props.getLeave()
 }
  sidenav=(role,id)=>{
    if(role.toLowerCase() == "admin" ){
      return (
        <Nav  className="flex-column  mr-auto ">
              <Nav.Link  className="m-3 "><Link to="/profile" className="navlink" > Profile </Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/role" className="navlink"> Role</Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/user" className="navlink"> User</Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/myleave" className="navlink">My Leave</Link></Nav.Link>

             
         
            </Nav>
      )
    }
    else  if(role.toLowerCase() == "hr" ){
      return(
        <Nav  className="flex-column  mr-auto ">
              <Nav.Link  className="m-3 "><Link to="/profile" className="navlink" >  Profile</Link></Nav.Link>
      <Nav.Link className="m-3" > <Link to="/leave" className="navlink"> Leave <Badge variant="primary">{id}</Badge></Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/myleave" className="navlink">My Leave</Link></Nav.Link>

             
            </Nav>
      )
    }
    else return(
      <Nav  className="flex-column  mr-auto ">
            <Nav.Link className="m-3 "><Link to="/profile" className="navlink" >  Profile</Link></Nav.Link>
            <Nav.Link className="m-3" > <Link to="/myleave" className="navlink">My Leave</Link></Nav.Link>
           
          </Nav>
    )
  }
  render() {
  
    
    return (
    
      <div className="sidenav "  >


<Navbar expand="lg" variant="light" className="navs" bg="light">
{this.props.isauthendicate ?
 this.sidenav(this.props.user.role.role,this.props.leave.count) : ""}
 
</Navbar>
      </div>
   
    );
  }
}
const mappropsTostate=(state)=>({
  user:state.auth.user,
  leave:state.leave.leave,
  isauthendicate:state.auth.isauthendicate
})
export default connect(mappropsTostate,{getLeave }) (Navbarcomponent);