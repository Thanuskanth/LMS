import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addRole } from '../../actions/roleaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addleave } from '../../actions/authaction';
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class CreateUser extends Component {
    state = {
        modalShow: false,
        startdate:new Date(),
        enddate:new Date(),
        reson: "",
        user: null,

    }

    onChangestartdate = (date) => {
        this.setState({
            startdate:date
        })
    }
    onChangeenddate = (date) => {
        this.setState({
            enddate: date
        })
    }
    onChangereson = (e) => {
        this.setState({
            reson: e.target.value
        })
    }
    onChangeuser = (e) => {

        this.setState({
            user: this.refs.role.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { startdate,enddate,reson,user} = this.state;
        const leave = {

           startdate,enddate,reson,user:this.props.user._id
           
        }
        this.props.addleave(leave);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }
    componentDidMount() {
        // this.props.getRole()
    }


    render() {
        const { modalShow } = this.state;




        const { role } = this.props;
        return (

            <div  >
                <Button variant="primary" className="addRole" onClick={this.ontoggle}>
                    Create Leave
                 </Button>

                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle} >
                        <Modal.Title className="modeltitle" id="contained-modal-title-vcenter">
                            <h2>  Create Leave</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="3">
                                    <Form.Label className="App">Start Date</Form.Label>
                                </Col>
                                <Col sm="9">
                                    <DatePicker selected={this.state.startdate} onChange={this.onChangestartdate} />
                                </Col>
                            </Form.Group>




                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="3">
                                    <Form.Label className="App">End Date</Form.Label>

                                </Col>
                                <Col sm="9">
                                    <DatePicker selected={this.state.enddate} onChange={this.onChangeenddate} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                <Col sm="3">
                                    <Form.Label className="App">Reson</Form.Label>
                                </Col>
                                <Col sm="9">
                                    <Form.Control as="textarea" onChange={this.onChangereson} rows="5" />
                                </Col>
                            </Form.Group>


                            <Button variant="primary" className="sbutton" type="submit">
                                Submit
                     </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.auth.user,

})
export default connect(mapStateToProps, { addleave })(CreateUser);