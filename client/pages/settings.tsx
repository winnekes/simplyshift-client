import { Divider, Heading } from "@chakra-ui/react";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import { ChangePassword } from "../components/settings/change-password";
import { DeleteAccount } from "../components/settings/delete-account";
import { useAuth } from "../contexts/auth-context";
import Login from "./login";

export default function Settings() {
  const { user } = useAuth();

  // todo try to handle globally (so we don't have to add this check on every protected page)
  if (!user) {
    return <Login />;
  }

  return (
    <PageWrapper title="Settings" isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>Settings</Heading>
        </Page.Title>
        <Page.Content>
          <ChangePassword />
          <Divider my={10} />
          <DeleteAccount />
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
