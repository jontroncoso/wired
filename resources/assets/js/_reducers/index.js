import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { drinks } from './drinks.reducer';
import { sips } from './sips.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    drinks,
    sips,
    alert
});

export default rootReducer;
