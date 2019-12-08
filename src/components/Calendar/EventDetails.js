import React from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';

export default function EventDetails(props) {
    const { event } = props;
    const startDate = moment(event.start).format('MM-DD-YYYY');
    const endDate = moment(event.end).format('MM-DD-YYYY');
    return (
        <Card
            style={{
                width: '16rem',
            }}
        >
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {event.note}
                </Card.Subtitle>
                <Card.Text>
                    {startDate === endDate && (
                        <>
                            <Moment format="DD MMMM YYYY">{event.start}</Moment>
                            <br />
                            <Moment format="hh:mm a">
                                {event.start}
                            </Moment> -{' '}
                            <Moment format="hh:mm a">{event.end}</Moment>
                        </>
                    )}
                    {startDate !== endDate && (
                        <>
                            <Moment format="DD">{event.start}</Moment> -{' '}
                            <Moment format="DD MMMM YYYY">{event.end}</Moment>
                            <br />
                            <Moment format="hh:mm a">
                                {event.start}
                            </Moment> -{' '}
                            <Moment format="hh:mm a">{event.end}</Moment>
                        </>
                    )}
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Close this view</Card.Link>
            </Card.Body>
        </Card>
    );
}