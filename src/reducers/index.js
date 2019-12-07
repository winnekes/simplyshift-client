import { combineReducers } from 'redux';
import user from './user';
import shiftEntries from './shiftEntries';

export default combineReducers({
    user,
    shiftEntries,
});
