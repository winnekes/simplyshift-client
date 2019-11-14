import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import store from './store';
import CalendarContainer from './components/CalendarContainer';
import NavigationBarContainer from './components/NavigationBarContainer';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationBarContainer />
                <Route exact path="/calendar" component={CalendarContainer} />
            </Provider>
        );
    }
}

export default App;
