import { sipConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, authHeader } from '../_helpers';

export const sipActions = {
    getAll,
    consume,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch('/api/sips', requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch(success(data.sips)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: sipConstants.GETALL_REQUEST } }
    function success(sips) { return { type: sipConstants.GETALL_SUCCESS, sips } }
    function failure(error) { return { type: sipConstants.GETALL_FAILURE, error } }
}

function consume(drink) {
    return dispatch => {
        dispatch(request());

        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({ drink_id: drink.id }),
        };

        return fetch('/api/sips', requestOptions)
            .then(handleResponse)
            .then(
                data =>
                {
                    console.log('sipActions.getAll ', sipActions.getAll);
                    dispatch(sipActions.getAll());
                    dispatch(success(data.sip));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: sipConstants.POST_REQUEST } }
    function success(sip) { return { type: sipConstants.POST_SUCCESS, sip } }
    function failure(error) { return { type: sipConstants.POST_FAILURE, error } }
}
