import { SELECT_SHIFT } from '../actions/shifts';

export default function(state = null, action = {}) {
    switch (action.type) {
        case SELECT_SHIFT:
            if (state === action.payload) {
                return null;
            }
            return action.payload;
        default:
            return state;
    }
}
