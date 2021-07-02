import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { Common } from "../../translations/common-types";

const supportedLanguages = [
  { locale: "de-DE", name: "Deutsch" },
  { locale: "en-US", name: "English" },
];

export const LanguageSwitch = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <Box color="gray.500" fontSize="sm">
      {t(Common.CHANGE_LANGUAGE)}:{" "}
      {supportedLanguages.map((language, index) => {
        const spacer = index < supportedLanguages.length - 1 && " | ";

        if (router.locale === language.locale) {
          return (
            <>
              {language.name} {spacer}
            </>
          );
        }
        return (
          <>
            <Link
              key={language.locale}
              href={router.pathname}
              locale={language.locale}
            >
              {language.name}
            </Link>
            {spacer}
          </>
        );
      })}
    </Box>
  );
};
