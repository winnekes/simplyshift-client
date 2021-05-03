import { Heading } from "@chakra-ui/react";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { ShiftModel } from "../components/shift-model";

export default function Calendar() {
  const localizer = momentLocalizer(moment);
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" },
  ];
  return (
    <PageWrapper title="Calendar" isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>My calendar</Heading>
        </Page.Title>
        <Page.Content>
          <BigCalendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={["month"]}
            popup
            selectable
          />
        </Page.Content>
      </Page>
      {<ShiftModel />}
    </PageWrapper>
  );
}
