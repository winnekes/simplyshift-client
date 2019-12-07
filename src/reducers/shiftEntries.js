import { SHIFTS_FETCHED } from '../actions/shifts';

export default function(state = [], action = {}) {
    switch (action.type) {
        case SHIFTS_FETCHED:
            if (action.payload.length > 0) {
                return action.payload.map(shift => ({
                    title: shift.shiftModel.name,
                    start: shift.startsAt,
                    end: shift.endsAt,
                    color: shift.shiftModel.color,
                }));
            }
            return state;
        default:
            return state;
    }
}
