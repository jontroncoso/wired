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
        dispatch(request({ email }));

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
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(data) {
        const me = data.me;
        const user = data;
        delete user.me;
        return { type: userConstants.LOGIN_SUCCESS, user, me };
    }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function getMe() {
    return dispatch => {
        dispatch(request({ me: true }));

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
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(data) {
        const me = data.me;
        const user = data;
        delete user.me;
        return { type: userConstants.LOGIN_SUCCESS, user, me };
    }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        localStorage.removeItem('user');
        dispatch({ type: userConstants.LOGOUT });
        // window.location.href = '/';
    };

}

function register(user) {
    return dispatch => {
        dispatch(request(user));

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

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(data) {
        console.log('data.me ', data);
        const me = data.me;
        const user = data;
        delete user.me;
        return { type: userConstants.LOGIN_SUCCESS, user, me };
    }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
