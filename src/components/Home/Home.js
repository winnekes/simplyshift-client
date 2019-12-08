import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class HomeContainer extends Component {
    render() {
        return <Link to="/calendar">Calendar</Link>;
    }
}
