import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../actions/dispatchHandler';
import { shiftEntriesFetched, shiftModelsFetched } from '../../actions/shifts';
import { SHIFT_ENTRIES_PATH, SHIFT_MODELS_PATH } from '../../constants';
import ShiftCalendar from './Calendar';

class CalendarContainer extends Component {
    componentDidMount = () => {
        this.props.getData(SHIFT_ENTRIES_PATH, shiftEntriesFetched);
        this.props.getData(SHIFT_MODELS_PATH, shiftModelsFetched);
    };

    render() {
        console.log('test');
        return <ShiftCalendar shiftEntries={this.props.shiftEntries} />;
    }
}

const mapStateToProps = state => {
    return {
        shiftEntries: state.shiftEntries,
    };
};
export default connect(mapStateToProps, { getData })(CalendarContainer);
