import { drinkConstants } from '../_constants';

export function drinks(state = {items: [], item: {}}, action) {
    switch (action.type) {
    case drinkConstants.GET_SUCCESS:
        return Object.assign({}, state, {
            item: action.drink,
            modalPosition: 'open',
        });
    case drinkConstants.GETALL_SUCCESS:
        return Object.assign({}, state, { items: action.drinks });
    case drinkConstants.GETALL_FAILURE:
    case drinkConstants.GET_FAILURE:
        return { error: action.error };
    case drinkConstants.POST_SUCCESS:
    case drinkConstants.PUT_SUCCESS:
    case drinkConstants.DELETE_SUCCESS:
    case drinkConstants.CLOSE_MODAL:
        return Object.assign({}, state, { modalPosition: 'closed' });
    case drinkConstants.CREATE_MODAL:
        return Object.assign({}, state, { modalPosition: 'open', item: {
            name: '',
            description: '',
            price: 0,
            dosage: 0,
            id: 0,
        } });
    default:
        return state;
    }
}
