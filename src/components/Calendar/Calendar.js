import React from 'react';
import * as ReactCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../assets/styles/calendar.css';
import { Button } from 'react-bootstrap';
import EventDetails from './EventDetails';

const localizer = ReactCalendar.momentLocalizer(moment);

function eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = '#' + event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '20px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        paddingLeft: '10px',
        display: 'block',
    };
    return {
        style: style,
    };
}
export default function Calendar(props) {
    return (
        <>
            <header className="main-calendar-header">
                <h1>your shift calendar</h1>
                <p>
                    Here you can view your shift calendar, see who is next on
                    your hitlist, and when you plan to quit your job, all in one
                    neat place!
                </p>
            </header>
            <div className="calendar-wrap">
                {props.shiftModels && (
                    <div className="shift-models">
                        <h3>your models</h3>
                        <p>Select a shift and assign it to the calendar.</p>
                        <nav>
                            {props.shiftModels.map(shiftModel => (
                                <Button
                                    key={shiftModel.id}
                                    style={{
                                        backgroundColor: `#${shiftModel.color}`,
                                    }}
                                >
                                    {shiftModel.name}
                                </Button>
                            ))}
                        </nav>
                    </div>
                )}
                <div className="calendar">
                    <h3>Calendar</h3>
                    <ReactCalendar.Calendar
                        localizer={localizer}
                        views={['month']}
                        events={props.shiftEntries}
                        eventPropGetter={eventStyleGetter}
                        onNavigate={props.onNavigate}
                        onSelectEvent={props.onSelectEvent}
                        popup
                    />
                </div>

                <div className="event-details">
                    <h3>Details</h3>
                    {props.event && <EventDetails event={props.event} />}
                </div>
            </div>
        </>
    );
}
