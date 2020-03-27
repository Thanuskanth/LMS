import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, AUTH_ERROR,USER_LOADING, USER_LODED,UPDATE_USER,DELETE_LEAVE,UPDATE_LEAVE ,ADD_LEAVE} from '../actions/type';

const initialState = {
    user: [],
    leave:[],
    isauthendicate: false,
    loading:false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return{
                loading:true
            }
            
        case LOGIN_SUCCESS:
            localStorage.getItem("token");
            return {
                ...state,
                ...action.payload,
                    leave:action.payload.leave,
                isauthendicate: true,
                loading:false
            }
            case USER_LODED:
             
                return {    
                    isauthendicate: true,
                    user:action.payload,
                    loading:false
                }
    
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                ...state,
                user: [],
                isauthendicate: false
            }
            case UPDATE_USER:
                // state.user=state.user.filter(user=>user._id!==action.payload._id)
                return{
                    ...state,
                    user: action.payload,
                    isauthendicate: true,
                    loading:false
                }
                case ADD_LEAVE:
                    return {
                        ...state,
                        leave: [...state.leave, action.payload]
                    }
                    case DELETE_LEAVE:
                        return {
                            ...state,
                            leave: state.leave.filter(leave => leave._id !== action.payload)
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
