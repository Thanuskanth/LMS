import { GET_ERROR, CLEAR_ERROR } from '../actions/type';

const initialState = {
    msg: {},
    id: null,
    status: null,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERROR:
            return {
                ...state,
                msg: action.payload.msg,
                id: action.payload.id,
                status: action.payload.status,
            }
        case CLEAR_ERROR:

            return {
                ...state,
                msg: {},
                id: null,
                status: null

            }

        default: return state;
    }
}
