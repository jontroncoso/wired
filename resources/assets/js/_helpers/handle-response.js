import { userActions } from '../_actions';
export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([403,401].indexOf(response.status) > -1 )
            {
                userActions.logout();
                window.location.href = '/login';
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
export function storeToken(response) {
    // login successful if there's a jwt token in the response
    if (response.token) {
        // store response details and jwt token in local storage to keep response logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
}
