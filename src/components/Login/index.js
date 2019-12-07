import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from './Login';

import { login } from '../../actions/user';

class LoginContainer extends Component {
    state = { email: '', password: '' };

    onSubmit = event => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password);
        this.setState({
            email: '',
            password: '',
        });
        this.props.history.push('/');
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        console.log(this.props);
        return (
            <Fragment>
                {!this.props.userToken && (
                    <Login
                        onSubmit={this.onSubmit}
                        onChange={this.onChange}
                        values={this.state}
                    />
                )}
                {this.props.userToken && <Redirect to="/" />}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userToken: state.userToken,
    };
};
export default connect(mapStateToProps, { login })(LoginContainer);
