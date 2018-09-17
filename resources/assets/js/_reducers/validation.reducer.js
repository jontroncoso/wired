import { validationConstants } from '../_constants';

export function validation(state = {errors: {}}, action) {
    switch (action.type) {
    case validationConstants.CLEAR:
        return { errors: {} };
    case validationConstants.ERROR:
        return { errors: action.errors };
    default:
        return state;
    }
}
