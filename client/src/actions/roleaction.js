import { GET_ROLE, ADD_ROLE, DELETE_ROLE, UPDATE_ROLE, ROLE } from '../actions/type';
import axios from 'axios';
import {header} from './authaction';
export const getRole = () => (dispatch,getState) => {

    axios.get('http://localhost:5000/role/',header(getState().auth.token)).then(res =>
        dispatch({
            type: GET_ROLE,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addRole = (role) => (dispatch,getState) => {
    axios.post('http://localhost:5000/role/add', { role },header(getState().auth.token)).then(res =>
        dispatch({
            type: ADD_ROLE,
            _id: res.data._id,
            role: res.data.role,
        })
    ).catch(err => console.log(err))

};

export const deleteRole = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:5000/role/'+id,header(getState().auth.token)).then(() =>
        dispatch({
            type: DELETE_ROLE,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updaterole = (role) => (dispatch,getState) => {
    axios.post('http://localhost:5000/role/' + role.id, { role: role.role },header(getState().auth.token)).then(res =>
        dispatch({
            type: UPDATE_ROLE,
            _id:role.id,
            role:role.role,
        })
    ).catch(err => console.log(err))

};
export const getArole = (id) => dispatch => {
    axios.get('http://localhost:5000/role/' + id).then(res =>
       {return(res.data)
     }
    ).catch(err => console.log(err))

};
