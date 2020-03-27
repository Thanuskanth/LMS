import {combineReducers} from 'redux';
import rolereducer from '../reducer/rolereducer';
import userreducer from '../reducer/userreducer';
import leavereducer from '../reducer/leavereducer';
import authreducer from '../reducer/authreducer';
import errorreducer from '../reducer/errorreducer';
export default combineReducers({
    role:rolereducer,
    leave:leavereducer,
    auth:authreducer,
    user:userreducer,
    err:errorreducer
})