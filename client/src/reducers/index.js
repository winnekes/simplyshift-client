import { combineReducers } from 'redux';
import user from './user';
import shifts from './shifts';
import shiftEntries from './shiftEntries';
import selectedTemplate from './selectedTemplate';

export default combineReducers({
    user,
    shifts,
    shiftEntries,
    selectedTemplate,
});
