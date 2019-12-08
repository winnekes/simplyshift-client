import lscache from 'lscache';

import { actionCreator } from './dispatchHandler';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER_DATA = 'SET_USER_DATA';

export const login = actionCreator(LOGIN);
export const getUserData = actionCreator(SET_USER_DATA);

export const logout = () => {
    lscache.flush();
    window.location.reload();
};

export const loginResponseTransformer = response => {
    lscache.enableWarnings(true);
    lscache.flushExpired();
    lscache.set('simplyshift-data', response.body, 60);
    return response.body.user;
};

export const getUserDataResponseTransformer = response => {
    lscache.enableWarnings(true);
    lscache.flushExpired();
    const userData = lscache.get('simplyshift-data');
    const updatedUserData = { ...userData, user: response.body };
    lscache.set('simplyshift-data', updatedUserData, 60);
    return response.body;
};

//todo: reset user data
