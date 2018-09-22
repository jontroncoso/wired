
export function pokemon(state = { items: []}, action) {
    switch (action.type) {
    case 'POKEMON_FOUND':
        return { items: action.pokemon };
    default:
        return state;
    }
}
