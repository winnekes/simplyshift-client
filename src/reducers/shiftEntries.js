import { SHIFT_ENTRIES_FETCHED } from '../actions/shifts';

export default function(state = [], action = {}) {
    switch (action.type) {
        case SHIFT_ENTRIES_FETCHED:
            if (action.payload.length > 0) {
                return action.payload.map(shift => ({
                    id: shift.id,
                    title: shift.shiftModel.name,
                    start: shift.startsAt,
                    end: shift.endsAt,
                    note: shift.note,
                    color: shift.shiftModel.color,
                }));
            }
            return state;
        default:
            return state;
    }
}
