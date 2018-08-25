import { drinkConstants } from '../_constants';

export function drinks(state = {items: []}, action) {
    switch (action.type) {
    case drinkConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case drinkConstants.GETALL_SUCCESS:
        return {
            items: action.drinks
        };
    case drinkConstants.GETALL_FAILURE:
        return {
            error: action.error
        };
    case drinkConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return Object.assign({},
            state,
            {
                items: state.items.map(user =>
                    user.id === action.id
                        ? Object.assign({}, user, { deleting: true })
                        : user
                )
            }
        );
    case drinkConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            items: state.items.filter(user => user.id !== action.id)
        };
    case drinkConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        return Object.asign({},
            state,
            {items: state.items.map(user => {
                if (user.id === action.id) {
                    // make copy of user without 'deleting:true' property
                    const userCopy = Object.assign({}, user);
                    delete userCopy.deleting;
                    // return copy of user with 'deleteError:[error]' property
                    return Object.assign({}, userCopy, {deleteError: action.error} );
                }

                return user;
            })
            });
    default:
        return state;
    }
}
