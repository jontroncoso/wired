import { drinkConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, authHeader } from '../_helpers';

export const drinkActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch('/api/drinks', requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch(success(data.drinks)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: drinkConstants.GETALL_REQUEST } }
    function success(drinks) { return { type: drinkConstants.GETALL_SUCCESS, drinks } }
    function failure(error) { return { type: drinkConstants.GETALL_FAILURE, error } }
}
