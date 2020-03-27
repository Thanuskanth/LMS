import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Create from './createleave.component';
import Update from './updateLeave.component';
import { getLeave } from '../../actions/leaveaction';

class ListLeave extends Component {
    componentDidMount() {
        
    }
    date = (date) => {
        return date.substring(0, 10)
    }

    render() {
        
        const leavedata = this.props.leave.map(user => {
                        if(user.status === "Pending"){
                            return {
                                reson: user.reson,
                                startdate: this.date(user.startdate),
                                enddate: this.date(user.enddate),
                                status:user.status,
                                action: <Update id={user._id} />
                            }
                        }
                        else{
                            return {
                                reson: user.reson,
                                startdate: this.date(user.startdate),
                                enddate: this.date(user.enddate),
                
                                status:user.status
                            }
                        }
           
        });

        const data = {
            columns: [
               
                {
                    label: 'Reson',
                    field: 'reson',

                    width: 270
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
                },
                {
                    label: 'Action',
                    field: 'action',

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
                    <h2 className="addRoletitle" >Leave Details</h2>
                    <div className="addRole" >
                        <Create />
                    </div>
                </div>
                <MDBDataTable
                    striped
                    hover
                    data={data}
                />
            </div>
            :""}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    leave:state.auth.leave,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, { getLeave })(ListLeave);
