import { SHIFT_MODELS_FETCHED } from '../actions/shifts';

export default function(state = [], action = {}) {
    switch (action.type) {
        case SHIFT_MODELS_FETCHED:
            return action.payload;
        default:
            return state;
    }
}
