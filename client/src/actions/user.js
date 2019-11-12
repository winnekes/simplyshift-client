import request from 'superagent';

export const JWT = 'JWT';

const baseUrl = 'http://localhost:4200';

function jwt(payload) {
    return {
        type: JWT,
        payload
    };
}

export const login = (email, password) => dispatch => {
    request
        .post(`${baseUrl}/login`)
        .send({ email, password })
        .then(response => {
            const action = jwt(response.body.jwt);

            dispatch(action);
        });
};

export const signUp = (email, password) => dispatch => {
    request.post(`${baseUrl}/user`).send({ email, password });
};
