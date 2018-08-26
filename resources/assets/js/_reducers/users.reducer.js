import { userConstants } from '../_constants';

export function users(state = {item: {}}, action) {
    switch (action.type) {
    case userConstants.LOGOUT:
        // add 'deleting:true' property to user being deleted
        return {}
    case userConstants.LOGIN_SUCCESS:
        return {item: action.me}
    default:
        return state;
    }
}
