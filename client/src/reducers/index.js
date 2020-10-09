import { combineReducers } from 'redux';

import user from './user';
import shiftEntries from './shiftEntries';
import shiftModels from './shiftModels';

export default combineReducers({
    user,
    shiftEntries,
    shiftModels,
});
