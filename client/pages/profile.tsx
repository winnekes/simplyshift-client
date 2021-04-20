import { Heading } from "@chakra-ui/react";
import { Page } from "../components/page";
import { PageWrapper } from "../components/page-wrapper";

export default function Profile() {
  return (
    <PageWrapper title="My profile" isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>My profile</Heading>
        </Page.Title>
        <Page.Content></Page.Content>
      </Page>
    </PageWrapper>
  );
}
