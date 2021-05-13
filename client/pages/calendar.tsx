import { Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Scheduler } from "../components/calendar/scheduler";
import { AddModelModal } from "../components/shift-models/add-model-modal";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import "react-big-calendar/lib/css/react-big-calendar.css";

// todo optimise usage of arrow functions?
export default function Calendar() {
  const [showAddModelModal, setShowModelModal] = useState(false);

  return (
    <>
      <PageWrapper title="Calendar" isProtectedPage>
        <Page>
          <Page.Title>
            <Heading>My calendar</Heading>
          </Page.Title>
          <Page.Content>
            <Scheduler />
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
