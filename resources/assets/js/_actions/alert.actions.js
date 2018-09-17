import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    manualValidationError,
    errorFromResponse,
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}
function manualValidationError(errors) {
    return { type: alertConstants.ERROR, message: '', errors };
}
function errorFromResponse(data) {
    return {
        type: alertConstants.ERROR,
        message: data.message,
    };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
