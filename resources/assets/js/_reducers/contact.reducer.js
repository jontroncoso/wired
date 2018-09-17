import { contactConstants } from '../_constants';

export function contact(state = {items: [], item: {}}, action) {
    switch (action.type) {
    case contactConstants.POST_SUCCESS:
        return Object.assign({}, state, { modalPosition: 'closed' });
    default:
        return state;
    }
}
