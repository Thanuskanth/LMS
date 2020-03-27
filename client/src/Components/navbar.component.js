import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Login from './auth/login.component';

const toggle = () => this.setState({
    isOpen:!this.state.isOpen
});
class Navbarcomponent extends Component {
    state={
        isOpen:false
    }
    render() {
        const {isOpen}=this.state;
        return (
//        </div>

<div className="navs">
<Navbar bg="dark"  variant="dark" >
  <Navbar.Brand  href="#home" >Leave Management System</Navbar.Brand>
  

  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
   <Login/>
  </Navbar.Collapse>
</Navbar>
<Nav></Nav>
</div>
        );
    }
}

export default Navbarcomponent;