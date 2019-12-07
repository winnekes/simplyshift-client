import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import store from './store';
import Login from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Provider>
        );
    }
}

export default App;
