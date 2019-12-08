import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignUp from './SignUp';

import { USERS_PATH } from '../../constants';
import { postData } from '../../actions/dispatchHandler';

class SignUpContainer extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        profileUrl: '',
    };

    onSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        this.props.postData(USERS_PATH, null, this.state);

        this.setState({
            email: '',
            username: '',
            password: '',
            profileUrl: '',
        });

        this.props.history.push('/');
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <SignUp
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                values={this.state}
            />
        );
    }
}

export default connect(null, { postData })(SignUpContainer);
