import {userActions} from '../_actions';
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    } else {
        userActions.logout();
        window.location.href = '/login';
        return {};
    }
}
