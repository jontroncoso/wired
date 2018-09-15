import { drinkConstants } from '../_constants';

export function drinks(state = {items: [], item: {}}, action) {
    switch (action.type) {
    case drinkConstants.GET_SUCCESS:
        return Object.assign({}, state, {
            item: action.drink,
            openModal: true,
        });
    case drinkConstants.CLOSE_MODAL:
        return Object.assign({}, state, { openModal: false });
    case drinkConstants.GETALL_SUCCESS:
        return Object.assign({}, state, { items: action.drinks });
    case drinkConstants.GETALL_FAILURE:
    case drinkConstants.GET_FAILURE:
        return { error: action.error };
    default:
        return state;
    }
}
