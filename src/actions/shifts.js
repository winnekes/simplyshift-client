import request from 'superagent';
import { BASE_URL } from '../constants';
export const SHIFTS_FETCHED = 'SHIFTS_FETCHED';
export const SHIFT_FETCHED = 'SHIFT_FETCHED';
export const SELECT_SHIFT = 'SELECT_SHIFT';
export const SCHEDULE_SHIFT = 'SCHEDULE_SHIFT';
export const SHIFT_CREATE_SUCCESS = 'SHIFT_CREATE_SUCCESS';
export const SHIFT_DELETE_SUCCESS = 'SHIFT_DELETE_SUCCESS';
export const SHIFT_UPDATE_SUCCESS = 'SHIFT_UPDATE_SUCCESS';

const shiftEntriesRoute = 'shiftEntries';

const shiftEntriesFetched = shiftEntries => ({
    type: SHIFTS_FETCHED,
    payload: shiftEntries,
});

export const loadShiftEntries = () => (dispatch, getState) => {
    const state = getState();
    const { userToken } = state.user;

    request
        .get(`${BASE_URL}/${shiftEntriesRoute}`)
        .set('Authorization', `Bearer ${userToken}`)
        .then(response => {
            dispatch(shiftEntriesFetched(response.body));
        })
        .catch(console.error);
};

/*

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
