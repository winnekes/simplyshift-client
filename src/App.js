import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import lscache from 'lscache';

import CalendarContainer from './components/Calendar';
import HomeContainer from './components/Home/Home';
import LoginContainer from './components/Login';
import NavigationContainer from './components/Navigation';
import SignUpContainer from './components/SignUp';

import { getUserData, getUserDataResponseTransformer } from './actions/user';
import { getData } from './actions/dispatchHandler';
import { USERS_PATH } from './constants';

class App extends Component {
    lsData = lscache.get('simplyshift-data');
    componentDidMount = () => {
        if (this.lsData && this.lsData.user) {
            this.props.getData(
                `${USERS_PATH}?id=${this.lsData.user.id}`,
                getUserData
            );
        }
    };

    render() {
        return (
            <>
                <Route path="/" component={NavigationContainer} />
                {this.props.user && (
                    <Route exact path="/" component={CalendarContainer} />
                )}
                {!this.props.user && (
                    <Route exact path="/" component={HomeContainer} />
                )}
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/signup" component={SignUpContainer} />
            </>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { getData })(App);
