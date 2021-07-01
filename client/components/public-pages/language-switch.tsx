import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Common } from "../../translations/common-types";
export const LanguageSwitch = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  console.log({ loc: router.locale }); // todo translate
  return (
    <Box color="gray.500" fontSize="sm">
      {t(Common.CHANGE_LANGUAGE)}:{" "}
      <Link href={router.pathname} locale="en-US">
        English
      </Link>{" "}
      |
      <Link href={router.pathname} locale="de-DE">
        Deutsch
      </Link>
    </Box>
  );
};
