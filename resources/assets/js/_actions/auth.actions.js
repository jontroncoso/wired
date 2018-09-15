import { userConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, storeToken, authHeader } from '../_helpers';

export const authActions = {
    login,
    logout,
    register,
    getMe,
};

function login(email, password) {
    return dispatch => {

        // userService.login(email, password)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        fetch('/api/auth/login', requestOptions)
            .then(handleResponse)
            .then(storeToken)
            .then(
                data => {
                    dispatch(success(data));
                    history.push('/');
                },
                error => {
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        error: error.toString(),
                    });
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}
function getMe() {
    return dispatch => {

        // userService.login(email, password)
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        fetch('/api/auth/me', requestOptions)
            .then(handleResponse)
            .then(storeToken)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(user) {
    return dispatch => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        return fetch('/api/auth/register', requestOptions)
            .then(handleResponse)
            .then(storeToken)
            .then(
                data => {
                    dispatch(success(data));
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    return dispatch => {
        localStorage.removeItem('user');
        dispatch({ type: userConstants.LOGOUT });
        dispatch(alertActions.clear());
    };

}

function success(data) {
    const me = data.me;
    const user = data;
    delete user.me;
    return { type: userConstants.LOGIN_SUCCESS, user, me };
}
