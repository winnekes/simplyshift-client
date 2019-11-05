import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainNavbarContainer from './components/MainNavbarContainer';
import FooterContainer from './components/FooterContainer';
import MainHeaderContainer from './components/MainHeaderContainer';
import MainContentContainer from './components/MainContentContainer';

function App() {
    return (
        <Provider store={store}>
            <MainNavbarContainer />

            <Route exact path="/" component={MainHeaderContainer}></Route>
            <Route exact path="/" component={MainContentContainer}></Route>
            {/*<Route component={NotFound} />*/}

            <FooterContainer />
        </Provider>
    );
}

export default App;
