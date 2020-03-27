import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addRole } from '../../actions/roleaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { login, logout } from '../../actions/authaction';
import { getRole } from '../../actions/roleaction';
import Swal from 'sweetalert2'
import Navbar from 'react-bootstrap/Navbar';
import  {clearError} from '../../actions/erroraction';
import NavLink from 'react-bootstrap/NavLink';

class CreateUser extends Component {
    state = {
        modalShow: false,
        email: "",
        password: "",

    }


    onChangeemail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onChangepassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    componentDidUpdate(prevprops) {
        if (this.props != prevprops) {
            if (this.props.err.id == "login_error") {
                this.setState({
                    msg: this.props.err.msg
                })
            }
            else {
                this.setState({
                        msg:null
                    })
            }
        }
        if(this.state.modalShow){
            if(this.props.isauthendicate){
                this.ontoggle();
            }
        }
    
        
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        this.props.login({ email, password });
        

    }

    ontoggle = () => {
       this.props.clearError();
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    render() {
        const guest = (<NavLink variant="primary" className="addRole" onClick={this.ontoggle}>
            <Navbar.Text>  Login</Navbar.Text>
        </NavLink>);
        const user = (<NavLink variant="primary" className="addRole" >



            <Dropdown>
                <Dropdown.Toggle variant="light"  >

                    {this.props.user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.props.logout()}>logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


        </NavLink>);

        const { modalShow } = this.state;
        return (

            <div  >

                {
                    this.props.isauthendicate ? user : guest
                }


                <Modal
                    show={modalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    
                    className="model"
                >
                    <Modal.Header closeButton onClick={this.ontoggle} >
                        <Modal.Title className="modeltitle" id="contained-modal-title-vcenter">
                            <h2>  Login</h2>

                        </Modal.Title>



                    </Modal.Header>
                    <Modal.Body className="modelbody">
                        {this.state.msg ?
                            <Alert variant="danger">
                               {this.state.msg}
                            </Alert> : ""

                        }
                        <Form onSubmit={this.onSubmit}>

                            <Form.Group controlId="formBasicEmail">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type="text" onChange={this.onChangeemail} placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control type="password" onChange={this.onChangepassword} placeholder=" Enter Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className=" justify-content-center d-flex">

                            <Button variant="primary" className="btn-lg btn-block" type="submit">
                                Submit
                    </Button>
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicPassword" className=" justify-content-center d-flex">

                            Reset password
                    </Form.Group> */}
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isauthendicate: state.auth.isauthendicate,
    user: state.auth.user,
    err: state.err
})
export default connect(mapStateToProps, { login, logout ,clearError})(CreateUser);