import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import store from './store';
import Login from './components/Login';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Route exact path="/login" component={Login} />
            </Provider>
        );
    }
}

export default App;
