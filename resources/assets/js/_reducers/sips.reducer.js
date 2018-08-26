import { sipConstants } from '../_constants';

export function sips(state = {items: []}, action) {
    switch (action.type) {
    case sipConstants.GETALL_REQUEST:
        return {
            loading: true,
            items: state.items,
        };
    case sipConstants.GETALL_SUCCESS:
        return {
            items: action.sips
        };
    case sipConstants.GETALL_FAILURE:
        return {
            error: action.error
        };
    default:
        return state;
    }
}
