import { contactConstants } from '../_constants';
import { alertActions, validationActions } from '.';
import { history, handleResponse, authHeader } from '../_helpers';

export const contactActions = { save };

function save(contactParams) {
    console.log('save: contactParams ', contactParams);
    return dispatch => {
        dispatch({ type: contactConstants.POST_REQUEST });
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(contactParams),
        };

        return fetch('/api/contact', requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch({ type: contactConstants.POST_SUCCESS }),
                error =>
                {
                    dispatch(alertActions.errorFromResponse(error));
                    dispatch(validationActions.errorFromResponse(error));
                }
            );
    };

    function failure(error) { return { type: contactConstants.POST_FAILURE, error } }
}
