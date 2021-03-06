import { Heading } from "@chakra-ui/react";
import { Scheduler } from "../components/calendar/scheduler";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";

export default function Calendar() {
  return (
    <PageWrapper isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>My calendar</Heading>
        </Page.Title>
        <Page.Content>
          <Scheduler />
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
