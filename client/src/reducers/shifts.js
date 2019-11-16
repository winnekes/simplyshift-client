const shifts = [
    {
        id: 1,
        start: 'T06:00:00+00:00',
        end: 'T14:30:00+00:00',
        title: 'morning',
    },
    {
        id: 2,
        start: 'T12:00:00+00:00',
        end: 'T20:30:00+00:00',
        title: 'late',
    },
    {
        id: 3,
        start: 'T20:30:00+00:00',
        end: 'T06:30:00+00:00',
        title: 'night',
    },
    {
        id: 4,
        start: 'T08:00:00+00:00',
        end: 'T16:30:00+00:00',
        title: 'training',
    },
];

export default (state = shifts, action) => {
    return state;
};
