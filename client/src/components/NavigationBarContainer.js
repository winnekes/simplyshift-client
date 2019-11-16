import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';

export default class NavigationBarContainer extends Component {
    render() {
        return <NavigationBar />;
    }
}

/* const mapStateToProps = state => {};

export default connect(mapStateToProps, {})(NavigationBarContainer);
 */
