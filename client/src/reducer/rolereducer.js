import { GET_ROLE, ADD_ROLE, DELETE_ROLE, UPDATE_ROLE } from '../actions/type';

const initialState = {
    role: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROLE:
            return {
                ...state,
                role: action.payload
            }

        case ADD_ROLE:
            return {
                ...state,
                role: [...state.role, {"_id":action._id,"role":action.role}]
            }
            case DELETE_ROLE:
                return{
                    ...state,
                    role:state.role.filter(role=>role._id!==action.payload)
                }
                case UPDATE_ROLE:
                    state.role=state.role.filter(role=>role._id!==action._id)
                    return{
                        ...state,
                        role: [...state.role, {_id:action._id,role:action.role}]
                    }
    
        default: return state;
    }
}