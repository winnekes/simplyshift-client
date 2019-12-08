import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, deleteData } from '../../actions/dispatchHandler';
import {
    shiftEntriesFetched,
    shiftModelsFetched,
    shiftModelDeleted,
} from '../../actions/shifts';
import { SHIFT_ENTRIES_PATH, SHIFT_MODELS_PATH } from '../../constants';
import Calendar from './Calendar';
import ShiftModels from '../ShiftModels/ShiftModels';
import EventDetails from './EventDetails';

class CalendarContainer extends Component {
    state = {
        selectedEvent: null,
        selectedModel: null,
    };
    onNavigate = date => {
        this.props.getData(
            `${SHIFT_ENTRIES_PATH}?month=${date}`,
            shiftEntriesFetched
        );
    };
    onSelectEvent = event => {
        console.log(event);
        this.setState({ selectedEvent: event });
    };

    onSelectModel = model => {
        this.setState({ selectedModel: model });
    };

    onSelectSlot = slot => {};

    onDeleteModel = id => {
        this.props
            .deleteData(SHIFT_MODELS_PATH, id, shiftModelDeleted)
            .then(() =>
                this.props.getData(SHIFT_MODELS_PATH, shiftModelsFetched)
            );
    };

    componentDidMount = () => {
        this.props.getData(SHIFT_ENTRIES_PATH, shiftEntriesFetched);
        this.props.getData(SHIFT_MODELS_PATH, shiftModelsFetched);
    };

    render() {
        return (
            <>
                <header className="main-calendar-header">
                    <h1>your shift calendar</h1>
                    <p>
                        Here you can view your shift calendar, see who is next
                        on your hitlist, and when you plan to quit your job, all
                        in one neat place!
                    </p>
                </header>
                <div className="calendar-wrap">
                    {this.props.shiftModels && (
                        <ShiftModels
                            models={this.props.shiftModels}
                            onSelectModel={this.onSelectModel}
                            selectedModel={this.state.selectedModel}
                            deleteModel={this.onDeleteModel}
                        />
                    )}
                    <Calendar
                        user={this.props.user}
                        shiftEntries={this.props.shiftEntries}
                        onNavigate={this.onNavigate}
                        onSelectEvent={this.onSelectEvent}
                        event={this.state.selectedEvent}
                    />
                    <div className="event-details">
                        <h3>Details</h3>
                        {this.state.selectedEvent && (
                            <EventDetails event={this.state.selectedEvent} />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        shiftEntries: state.shiftEntries,
        shiftModels: state.shiftModels,
        user: state.user,
    };
};
export default connect(mapStateToProps, { getData, deleteData })(
    CalendarContainer
);
