import { drinkConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, authHeader } from '../_helpers';

export const drinkActions = {
    getAll,
    get,
    closeModal,
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

function get(drinkId) {
    return dispatch => {
        dispatch(request());

        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch('/api/drinks/' + drinkId, requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch(success(data.drink)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: drinkConstants.GET_REQUEST } }
    function success(drink) { return { type: drinkConstants.GET_SUCCESS, drink } }
    function failure(error) { return { type: drinkConstants.GET_FAILURE, error } }
}

function closeModal() {
    return dispatch => dispatch({ type: drinkConstants.CLOSE_MODAL});
}
