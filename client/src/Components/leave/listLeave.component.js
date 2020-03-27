import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Create from './createleave.component';
import Update from './updateLeave.component';
import { getLeave, updateleave } from '../../actions/leaveaction';
import Form from 'react-bootstrap/Form';

class ListLeave extends Component {
    componentDidMount() {
        this.props.getLeave();
    }
    date = (date) => {
        return date.substring(0, 10)
    }
    onUpdatestatus = (e) => {
        
        this.props.updateleave(e.target.id, { status: e.target.value })
    }
    render() {

     

        const leavedata = this.props.leave.map(user => {
            if (user.status !== "Pending") {
                return {
                    name: user.user.username,
                    reson: user.reson,
                    startdate: this.date(user.startdate),
                    enddate: this.date(user.enddate),
                    status: user.status
                }

            }
            else {
               
                return {
                    name: user.user.username,
                    reson: user.reson,
                    startdate: this.date(user.startdate),
                    enddate: this.date(user.enddate),
                    status: <Form.Group controlId={user._id}>

                        <Form.Control as="select" ref="role" custom onChange={this.onUpdatestatus}>
                            <option value="Pending">Pending</option>

                            <option value="Accepted">Accepted</option>
                            <option value="Regected">Regected</option>


                        </Form.Control>
                    </Form.Group>
                }
            }


        });
        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',

                    width: 150
                },
                {
                    label: 'Reson',
                    field: 'reson',

                    width: 370
                },
                {
                    label: 'StartDate',
                    field: 'startdate',

                    width: 200
                },
                ,
                {
                    label: 'EndDate',
                    field: 'enddate',

                    width: 200
                },
                {
                    label: 'Status',
                    field: 'status',

                    width: 200
                }


            ],
            rows:
                leavedata

        };


        return (
            <div   >
                {this.props.isauthendicate ?
                    <div   >
                        <div className="mb-5">
                            <h2 className="addRoletitle justify-content-center" >Leave Details</h2>
                            
                        </div>
                        <MDBDataTable
                            striped
                            hover
                            data={data}
                        />
                    </div>
                    : ""}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    leave: state.leave.leave,
    isauthendicate: state.auth.isauthendicate

})
export default connect(mapStateToProps, { getLeave, updateleave })(ListLeave);
