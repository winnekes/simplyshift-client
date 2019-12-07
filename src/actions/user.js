import request from 'superagent';
import { BASE_URL } from '../constants';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

function setUserData(payload) {
    return {
        type: LOGIN,
        payload: {
            userToken: payload.jwt,
            userDetails: payload.user,
        },
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export const signUp = data => dispatch => {
    console.log(data);
    if (!data.profileUrl) delete data.profileUrl;
    request
        .post(`${BASE_URL}/users`)
        .send(data)
        .then(response => console.log(response))
        .catch(err => console.log(err));
};

export const login = (email, password) => dispatch => {
    request
        .post(`${BASE_URL}/login`)
        .send({ email, password })
        .then(response => {
            console.log(response);
            const action = setUserData(response.body);
            dispatch(action);
        })

        .catch(err => console.log(err));
};
