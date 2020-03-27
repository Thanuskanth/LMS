import { GET_LEAVE,ADD_LEAVE,DELETE_LEAVE,UPDATE_LEAVE } from '../actions/type';
import axios from 'axios';
import {header} from './authaction';

export const getLeave = () => (dispatch,getState) => {

    axios.get('http://localhost:5000/leave/',header(getState().auth.token)).then(res =>
        dispatch({
            type: GET_LEAVE,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const getleave=(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:5000/leave/' +id, header(getState().auth.token)).then(res => {
        return({
            startdate:res.data.startdate,
            enddate:res.data.enddate,
            reson:res.data.reson,
        })
    }


    ).catch(err => console.log(err))
}
export const updateleave = (id,leave) => (dispatch,getState,) => {
    axios.post('http://localhost:5000/leave/' +id,leave,header(getState().auth.token)).then(res =>
        dispatch({
            type: UPDATE_LEAVE,
           payload:res.data
        })
    ).catch(err => console.log(err))

};
