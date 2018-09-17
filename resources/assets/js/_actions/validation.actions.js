import { validationConstants } from '../_constants';

export const validationActions = {
    error,
    errorFromResponse,
    clear,
};

function error(errors) {
    return { type: validationConstants.ERROR, errors };
}
function errorFromResponse(data) {
    return {
        type: validationConstants.ERROR,
        errors: data.errors ? data.errors : {},
    };
}
function clear() {
    return { type: validationConstants.CLEAR, errors: {} };
}
