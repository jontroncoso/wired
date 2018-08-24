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
