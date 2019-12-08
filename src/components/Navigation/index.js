import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from './Navigation';
import { logout } from '../../actions/user';

class NavigationContainer extends Component {
    onClickLogout = event => {
        this.props.logout();
        this.props.history.push('/');
    };

    render() {
        return (
            <Navigation user={this.props.user} logout={this.onClickLogout} />
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { logout })(NavigationContainer);
