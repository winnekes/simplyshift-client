import { Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { AddModelModal } from "../components/shift-models/add-model-modal";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// todo optimise usage of arrow functions?
export default function Calendar() {
  const [showAddModelModal, setShowModelModal] = useState(false);
  const localizer = momentLocalizer(moment);
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" },
  ];
  return (
    <>
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
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => setShowModelModal(true)}
            >
              Add shift
            </Button>
          </Page.Content>
        </Page>
      </PageWrapper>
      {showAddModelModal && (
        <AddModelModal onClose={() => setShowModelModal(false)} />
      )}
    </>
  );
}
