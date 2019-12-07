import { SELECT_SHIFT } from '../actions/shifts';

export default function(state = null, action = {}) {
    switch (action.type) {
        case SELECT_SHIFT:
            return action.payload;
        default:
            return state;
    }
}
