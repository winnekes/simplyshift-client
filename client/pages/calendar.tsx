import { Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Scheduler } from "../components/scheduler";
import { AddModelModal } from "../components/shift-models/add-model-modal";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ShiftModelsList } from "../components/shift-models/shift-models-list";

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
