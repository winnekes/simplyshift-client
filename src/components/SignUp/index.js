import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignUp from './SignUp';
import { signUp } from '../../actions/user';

class SignUpContainer extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        profileUrl: '',
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.signUp(this.state);
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

export default connect(null, { signUp })(SignUpContainer);
