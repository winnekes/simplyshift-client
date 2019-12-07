import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadShiftEntries } from '../../actions/shifts';

import ShiftCalendar from './ShiftCalendar';

class ShiftCalendarContainer extends Component {
    componentDidMount = () => {
        this.props.loadShiftEntries();
    };

    render() {
        console.log('test');
        return <ShiftCalendar shiftEntries={this.props.shiftEntries} />;
    }
}

const mapStateToProps = state => {
    return {
        userToken: state.user.userToken,
        shiftEntries: state.shiftEntries,
    };
};
export default connect(mapStateToProps, { loadShiftEntries })(
    ShiftCalendarContainer
);
