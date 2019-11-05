import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import MainNavbarContainer from './components/MainNavbarContainer';
import FooterContainer from './components/FooterContainer';
import MainHeaderContainer from './components/MainHeaderContainer';

function App() {
    return (
        <Provider store={store}>
            <MainNavbarContainer />
            <Switch>
                <Route exact path="/" component={MainHeaderContainer}></Route>
                {/*<Route component={NotFound} />*/}
            </Switch>
            <FooterContainer />
        </Provider>
    );
}

export default App;
