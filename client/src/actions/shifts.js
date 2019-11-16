import request from 'superagent';

export const SHIFTS_FETCHED = 'SHIFTS_FETCHED';
export const SHIFT_FETCHED = 'SHIFT_FETCHED';
export const SELECT_SHIFT = 'SELECT_SHIFT';
export const SHIFT_CREATE_SUCCESS = 'SHIFT_CREATE_SUCCESS';
export const SHIFT_DELETE_SUCCESS = 'SHIFT_DELETE_SUCCESS';
export const SHIFT_UPDATE_SUCCESS = 'SHIFT_UPDATE_SUCCESS';

const baseUrl = 'http://localhost:4020';
const shiftRoute = '/shifts';

export const selectShift = id => ({
    type: SELECT_SHIFT,
    payload: id,
});

const shiftDeleteSuccess = id => ({
    type: SHIFT_DELETE_SUCCESS,
    id,
});

/* const shiftsFetched = shifts => ({
    type: SHIFTS_FETCHED,
    shifts,
});

const shiftCreateSuccess = shift => ({
    type: SHIFT_CREATE_SUCCESS,
    shift,
});

const shiftFetched = shift => ({
    type: SHIFT_FETCHED,
    shift,
});
*/
/*
const shiftUpdateSuccess = shift => ({
    type: SHIFT_UPDATE_SUCCESS,
    shift,
});

export const loadShifts = () => (dispatch, getState) => {
    if (getState().shifts) return;

    request
        .get(`${baseUrl}/${shiftRoute}`)
        .then(response => {
            dispatch(shiftsFetched(response.body));
        })
        .catch(console.error);
};

export const createShift = data => dispatch => {
    request
        .post(`${baseUrl}/${shiftRoute}`)
        .send(data)
        .then(response => {
            dispatch(shiftCreateSuccess(response.body));
        })
        .catch(console.error);
};

export const loadShift = id => dispatch => {
    request
        .get(`${baseUrl}/${shiftRoute}/${id}`)
        .then(response => dispatch(shiftFetched(response.body)))
        .catch(console.error);
};

export const deleteShift = id => dispatch => {
    request
        .delete(`${baseUrl}/${shiftRoute}/${id}`)
        .then(response => dispatch(shiftDeleteSuccess(id)))
        .catch(console.error);
};

export const updateShift = (id, data) => dispatch => {
    request
        .put(`${baseUrl}/${shiftRoute}/${id}`)
        .send(data)
        .then(response => dispatch(shiftUpdateSuccess(response.body)))
        .catch(console.error);
};
 */
