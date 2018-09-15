import { drinkConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, authHeader } from '../_helpers';

export const drinkActions = {
    getAll,
    get,
    remove,
    save,
    createDrinkModal,
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
function remove(drinkId) {
    console.log('drinkId ', drinkId);
    return dispatch => {

        const requestOptions = {
            method: 'DELETE',
            headers: authHeader()
        };

        return fetch('/api/drinks/' + drinkId, requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch({ type: drinkConstants.DELETE_SUCCESS }),
                error => dispatch(failure(error.toString()))
            );
    };

    function failure(error) { return { type: drinkConstants.DELETE_FAILURE, error } }
}
function save(drink) {
    console.log('drinkId ', drink);
    return dispatch => {

        const requestOptions = {
            method: (drink.id ? 'PUT' : 'POST'),
            headers: authHeader(),
            body: JSON.stringify(drink),
        };

        const url = drink.id ? '/api/drinks/' + drink.id : '/api/drinks';

        return fetch(url, requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch({ type: drinkConstants.POST_SUCCESS }),
                error => dispatch(failure(error.toString()))
            );
    };

    function failure(error) { return { type: drinkConstants.POST_FAILURE, error } }
}

function closeModal() {
    return dispatch => dispatch({ type: drinkConstants.CLOSE_MODAL});
}

function createDrinkModal() {
    return dispatch => dispatch({ type: drinkConstants.CREATE_MODAL});
}
