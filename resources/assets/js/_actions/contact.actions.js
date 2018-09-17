import { contactConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, authHeader } from '../_helpers';

export const contactActions = { save };

function save(contactParams) {
    console.log('save: contactParams ', contactParams);
    return dispatch => {

        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(contactParams),
        };

        return fetch('/api/contact', requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch({ type: contactConstants.POST_SUCCESS }),
                error => dispatch(alertActions.errorFromResponse(error))
            );
    };

    function failure(error) { return { type: contactConstants.POST_FAILURE, error } }
}
