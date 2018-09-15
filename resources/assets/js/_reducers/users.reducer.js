import { userConstants } from '../_constants';

export function users(state = {item: {}}, action) {
    switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
        return {
            item: action.me,
            isAdmin: (action.me.id === 1),
        }
    default:
        return state;
    }
}
