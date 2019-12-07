import { combineReducers } from 'redux';
import user from './user';
import shiftModels from './shiftModels';
import shiftEntries from './shiftEntries';
import selectedShift from './selectedShift';

export default combineReducers({
    user,
    shiftModels,
    shiftEntries,
    selectedShift,
});
