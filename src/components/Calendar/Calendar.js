import React from 'react';
import * as ReactCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../assets/styles/calendar.css';
import { Button } from 'react-bootstrap';

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
                        <h2>Your shift models</h2>
                        <p>Select a shift and assign it to the calendar.</p>
                        <nav>
                            {props.shiftModels.map(shiftModel => (
                                <Button
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
                    <h2>Calendar</h2>
                    <ReactCalendar.Calendar
                        localizer={localizer}
                        views={['month']}
                        events={props.shiftEntries}
                        eventPropGetter={eventStyleGetter}
                        popup
                    />
                </div>

                <div className="event-details">
                    <h2>Sriram</h2>
                    <p>You are a monkey</p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
        </>
    );
}
