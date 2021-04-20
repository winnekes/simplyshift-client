import { Heading } from "@chakra-ui/react";
import { LoadingToast } from "../components/loading-toast";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";

export default function Calendar() {
  return (
    <PageWrapper title="Calendar" isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>My calendar</Heading>
        </Page.Title>
        <Page.Content></Page.Content>
      </Page>
    </PageWrapper>
  );
}
