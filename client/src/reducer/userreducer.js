import { GET_USER,ADD_USER,DELETE_USER,UPDATE_USER} from '../actions/type';

const initialState = {
    user: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                 user: action.payload
            }

        case ADD_USER:
            return {
                ...state,
                user: [...state.user, action.payload]
            }
            case DELETE_USER:
                return{
                    ...state,
                    user:state.user.filter(user=>user._id!==action.payload)
                }
                case UPDATE_USER:
                    state.user=state.user.filter(user=>user._id!==action.payload._id)
                    return{
                        ...state,
                        user: [...state.user,action.payload]
                    }
    
        default: return state;
    }
}