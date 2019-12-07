import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function ShiftCalendar(props) {
    return (
        <>
            <h1>Codaisseur Academy Calendar</h1>
            <p>
                Here you can view the Codaisseur Calendar, see who is teaching
                what lesson on what day. If you are a teacher's assistant, you
                can also volunteer to help out on lessons!
            </p>
            <div className="calendar-wrap">
                <div className="calendar">
                    <Calendar
                        views={['month']}
                        events={props.shiftEntries}
                        localizer={localizer}
                        style={{ height: '100vh' }}
                    />
                </div>
            </div>
        </>
    );
}
