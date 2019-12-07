import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import store from './store';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ShiftCalendarContainer from './components/ShiftCalendar';
import HomeContainer from './components/Home/HomeContainer';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route
                    exact
                    path="/calendar"
                    component={ShiftCalendarContainer}
                />
                <Route exact path="/home" component={HomeContainer} />
            </Provider>
        );
    }
}

export default App;
