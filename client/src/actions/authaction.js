import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_LOADING, USER_LODED, AUTH_ERROR, UPDATE_USER, ADD_LEAVE, DELETE_LEAVE, UPDATE_LEAVE } from '../actions/type';
import { getError } from './erroraction';
import axios from 'axios';

export const login = ({ email, password }) => dispatch => {
    userloading();
    axios.post('http://localhost:5000/login', { email, password }).then(res =>
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    ).catch(err => 
        dispatch(getError(err.response.data, err.response.status, "login_error"))

        // dispatch({ type: LOGIN_FAIL })


    )

};
export const loading = () => dispatch => {
    dispatch({
        type: USER_LOADING,
    })


};
export const getuser = (id) => dispatch => {
    userloading();

    axios.get('http://localhost:5000/user/' + id).then(res =>
        dispatch({
            type: USER_LODED,
            payload: res.data
        })
    ).catch(err => {
        dispatch(getError(err.res.data, err.res.status, "get_user"))
        dispatch({ type: AUTH_ERROR })

    }

    )

};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS,


    })


};
export const header = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}
export const userloading = () => (dispatch, setstate) => {
    dispatch({ type: USER_LOADING });
    const token = setstate().auth.token;
    const config = {
        header: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.header['x-auth-token'] = token;
    }
    axios.get('http://localhost:5000/auth/user', config).then(res => {
        dispatch({
            type: USER_LODED,
            payload: res.data
        })
    }).catch(err => {

        dispatch({ type: AUTH_ERROR })
    })


}
export const updateuser = (id, user) => (dispatch, getState) => {
    axios.post('http://localhost:5000/user/' + id, user, header(getState().auth.token)).then(res =>
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    )
        .catch(err => { dispatch(getError(err.response.data, err.response.status, "updateuser_error")) })

};
export const updatepassword = (id, password) => (dispatch, getState) => {
    axios.post('http://localhost:5000/user/password/' + id, password, header(getState().auth.token)).then(
        dispatch(getError("password changed", null, "pwd_success"))

    ).catch(err => { dispatch(getError(err.response.data, err.response.status, "password_change")) }
    )

};
export const addleave = (leave) => (dispatch, getState) => {
    console.log(leave)
    axios.post('http://localhost:5000/leave/add', leave, header(getState().auth.token)).then(res =>
        dispatch({
            type: ADD_LEAVE,
            payload: res.data


        })
    ).catch(err => console.log(err))

};


export const deleteleave = (id) => (dispatch, getState) => {

    axios.delete('http://localhost:5000/leave/' + id, header(getState().auth.token)).then(() =>
        dispatch({
            type: DELETE_LEAVE,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updateleave = (id, leave) => (dispatch, getState, ) => {
    axios.post('http://localhost:5000/leave/' + id, leave, header(getState().auth.token)).then(res =>
        dispatch({
            type: UPDATE_LEAVE,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const loadseeder = () => (dispatch, getState, ) => {
    axios.post('http://localhost:5000/seed').then(

    ).catch(err => console.log(err))

};