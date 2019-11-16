import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class CalendarContainer extends Component {
    // when shift is clicked
    onSelectEvent = event => {
        alert('hello!' + event.title);
        console.log(event);
    };

    // when date is selected
    onSelectSlot = slot => {
        alert('date!' + slot.start);
        console.log(slot);
    };

    render() {
        return (
            <Calendar
                defaultDate={new Date()}
                defaultView="month"
                views={['month']}
                events={this.props.shifts}
                localizer={localizer}
                onSelectEvent={this.onSelectEvent}
                onSelectSlot={this.onSelectSlot}
                resizable={false}
                selectable
                style={{ height: '100vh' }}
            />
        );
    }
}
const mapStateToProps = state => {
    const modifiedEntries = state.shiftEntries.map(entry => {
        const templateToEntry = state.shifts.find(shift => {
            return shift.id === entry.shiftTemplate_id;
        });
        return {
            ...entry,
            title: templateToEntry.title,
            start: entry.start.concat(templateToEntry.start),
            end: entry.end.concat(templateToEntry.end),
        };
    });

    console.log(modifiedEntries);
    return {
        shifts: modifiedEntries,
    };
};

export default connect(mapStateToProps)(CalendarContainer);
