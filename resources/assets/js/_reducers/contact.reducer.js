import { contactConstants } from '../_constants';

export function contact(state = {}, action) {
    switch (action.type) {
    case contactConstants.POST_SUCCESS:
        return Object.assign({}, state, { modalPosition: 'closed' });
    default:
        return state;
    }
}
