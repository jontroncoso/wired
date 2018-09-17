import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}
function errorFromResponse(data) {
    const responseObject = { type: alertConstants.ERROR };
    if (data.errors){
        responseObject.errors = data.errors;
    }
    if (data.message){
        responseObject.message = data.message;
    }
    return responseObject;
}

function clear() {
    return { type: alertConstants.CLEAR };
}
