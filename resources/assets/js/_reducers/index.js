import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { validation } from './validation.reducer';
import { drinks } from './drinks.reducer';
import { sips } from './sips.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { contact } from './contact.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    validation,
    users,
    drinks,
    sips,
    alert,
    contact,
});

export default rootReducer;
