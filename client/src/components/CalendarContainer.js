import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default class CalendarContainer extends Component {
    state = {
        events: [
            {
                start: '2019-11-13',
                end: '2019-11-13',
                title: 'Morning shift',
            },
        ],
    };

    onSelectEvent = () => {
        alert('hello!');
    };

    onEventResize = (type, { event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            return { events: state.events };
        });
        console.log(start);
    };

    render() {
        console.log(this.state.events);
        return (
            <DnDCalendar
                defaultDate={new Date()}
                defaultView="month"
                views={['month', 'week']}
                events={this.state.events}
                localizer={localizer}
                onEventDrop={this.onEventDrop}
                onEventResize={this.onEventResize}
                onSelectEvent={this.onSelectEvent}
                resizable
                style={{ height: '100vh' }}
            />
        );
    }
}
