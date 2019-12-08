import lscache from 'lscache';
import { LOGIN, LOGOUT, SET_USER_DATA } from '../actions/user';

export default function(state = null, action = {}) {
    switch (action.type) {
        case LOGIN:
            console.log(action.payload);
            return action.payload;
        case SET_USER_DATA:
            return action.payload;
        case LOGOUT:
            lscache.flush();
            window.location.reload();
            return {};
        default:
            return state;
    }
}
