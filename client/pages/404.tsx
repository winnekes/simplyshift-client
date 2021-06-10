import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Page } from "../components/layout/page";
import { PageWrapper } from "../components/layout/page-wrapper";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  });

  return (
    <PageWrapper isProtectedPage>
      <Page>
        <Page.Title>
          <Heading>Could not find the requested page.</Heading>
        </Page.Title>
      </Page>
    </PageWrapper>
  );
}
