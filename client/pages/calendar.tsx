import { Heading } from "@chakra-ui/react";
import { Scheduler } from "../components/calendar/scheduler";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import { useAuth } from "../contexts/auth-context";
import Login from "./login";

export default function Calendar() {
  const { user } = useAuth();

  // todo try to handle globally (so we don't have to add this check on every protected page)
  if (!user) {
    return <Login />;
  }

  return (
    <PageWrapper title="Calendar" isProtectedPage>
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
