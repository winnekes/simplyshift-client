import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";
import { ChangePassword } from "../components/settings/change-password";
import { useAuth } from "../contexts/auth-context";
import { SignupMutationData } from "../services/mutations/signup";
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
        </Page.Content>
      </Page>
    </PageWrapper>
  );
}
