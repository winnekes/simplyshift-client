import React from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
                <Card.Title>
                    {event.title} <FaEdit />
                    <FaTrash
                        onClick={() => {
                            props.deleteEntry(event.id);
                        }}
                    />
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {event.note}
                    orem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer tookg software orem Ipsum is simply dummy text of
                    the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                    when an unknown printer tookg software like Aldus PageMaker
                    including versions of Lorem orem Ipsum is simply dummy text
                    of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the
                    1500s, when an unknown printer tookg software like Aldus
                    PageMaker including versions of Lorem like Aldus PageMaker
                    including versions of Lorem
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
