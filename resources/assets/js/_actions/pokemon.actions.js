import { drinkConstants } from '../_constants';
import { alertActions } from './';
import { history, handleResponse, authHeader } from '../_helpers';

export const pokemonActions = {
    search,
};

function search(value) {
    return dispatch => {
        dispatch({type: 'POKEMON_REQUEST'});

        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };

        return fetch('/api/pokemon/' + value, requestOptions)
            .then(handleResponse)
            .then(
                data => dispatch({type: 'POKEMON_FOUND', pokemon: data.pokemon}),
                error => dispatch(alertActions.errorFromResponse(error))
            );
    };
}
