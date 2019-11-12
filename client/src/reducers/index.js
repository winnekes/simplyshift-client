import { combineReducers } from 'redux'
import user from './user'
import shiftTemplates from './shiftsTemplates'
import shiftEntries from './shiftEntries'

export default combineReducers({
    user,
    shiftTemplates,
    shiftEntries,
})
