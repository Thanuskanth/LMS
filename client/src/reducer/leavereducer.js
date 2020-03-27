import { GET_LEAVE, ADD_LEAVE, DELETE_LEAVE, UPDATE_LEAVE } from '../actions/type';

const initialState = {
    leave: [],
    count:null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LEAVE:
            return {
                ...state,
                leave: action.payload.leave,
                count: action.payload.count,

            }

        case UPDATE_LEAVE:
            state.leave = state.leave.filter(leave => leave._id !== action.payload._id)
            return {
                ...state,
                leave: [...state.leave, action.payload]
            }


        default: return state;
    }
}