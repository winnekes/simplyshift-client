import { Heading } from "@chakra-ui/react";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";

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
