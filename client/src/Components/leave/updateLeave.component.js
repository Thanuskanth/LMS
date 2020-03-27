import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pencil, X } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateleave, deleteleave, header } from '../../actions/authaction';
import { getleave } from '../../actions/leaveaction';
import axios from 'axios';
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";
import store from '../../store';
class UpdateLeave extends Component {
    state = {
        modalShow: false,
        startdate: new Date(),
        enddate: new Date(),
        reson: ""

    }

    onChangestartdate = (date) => {
        this.setState({
            startdate:date
        })
    }
    onChangeenddate = (date) => {
        this.setState({
            enddate:date
        })
    }
    onChangereson = (e) => {
        this.setState({
            reson: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { startdate, enddate, reson,user } = this.state;
        const leave = {
            startdate,
            enddate,
            reson,
            user


        }
        this.props.updateleave(this.props.id,leave);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
        // this.componentDidMount()
    }
    
    componentDidMount() {
        
        axios.get('http://localhost:5000/leave/' +this.props.id, header(store.getState().auth.token)) .then(res=>
        this.setState({
            startdate:res.data.startdate,
            enddate:res.data.enddate,
            reson:res.data.reson,
            user:res.data.user
          })
          )
        }
    
    
      
    onDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                this.props.deleteleave(id);
            }
        })




    }

   
    render() {
        const { modalShow } = this.state;
        
        return (

            <div >
                <Button variant="success" className="mr-3" onClick={()=>this.ontoggle()}>
                    <Pencil />
                </Button>
                <Button variant="danger" onClick={() => this.onDelete(this.props.id)}>
                    <X />
                </Button>

                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle} >
                        <Modal.Title className="modeltitle" id="contained-modal-title-vcenter">
                            <h2>  Update Leave</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="3">
                                    <Form.Label className="App">Start Date</Form.Label>
                                </Col>
                                <Col sm="9">
                                    <DatePicker  selected={new Date(this.state.startdate)}  onChange={this.onChangestartdate} />
                                </Col>
                            </Form.Group>




                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="3">
                                    <Form.Label className="App">End Date</Form.Label>

                                </Col>
                                <Col sm="9">
                                    <DatePicker selected={new Date(this.state.enddate)} format='yyyy-MM-dd' onChange={this.onChangeenddate} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                <Col sm="3">
                                    <Form.Label className="App">Reson</Form.Label>
                                </Col>
                                <Col sm="9">
                                    <Form.Control value={this.state.reson} format='yyyy-MM-dd' as="textarea" onChange={this.onChangereson} rows="5" />
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

export default connect(null, { updateleave, deleteleave,getleave })(UpdateLeave);