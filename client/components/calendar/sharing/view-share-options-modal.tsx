import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Badge,
  Alert,
  AlertIcon,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMutation } from "react-query";
import useSWR from "swr";
import { shareCalendarMutation } from "../../../mutations/share-calendar";
import { unshareCalendarMutation } from "../../../mutations/unshare-calendar";
import { Calendar } from "../../../types";
import { ErrorContainer } from "../../common/error-container";
import { Loading } from "../../common/loading";
import { useDisclosure } from "@chakra-ui/react";

import { ModalContent } from "../../common/overrides/modal";
import { Paragraph } from "../../common/paragraph";

interface Props {
  calendarName: string;

  onClose: () => void;
}

export function ViewShareOptionsModal({ calendarName, onClose }: Props) {
  // generate link  // share/unshare feature
  const {
    data: calendar,
    error,
    mutate: refetch,
    isValidating,
  } = useSWR<Calendar>(`/calendars/${calendarName}`);

  const {
    isLoading: shareCalendarLoading,
    mutate: shareCalendar,
  } = useMutation(shareCalendarMutation, { onSettled: () => refetch() });

  const {
    isLoading: unshareCalendarLoading,
    mutate: unshareCalendar,
  } = useMutation(unshareCalendarMutation, { onSettled: () => refetch() });

  const toggleShareCalendar = (calendar: Calendar) => {
    if (calendar.isShared) {
      unshareCalendar({ id: calendar.id });
    } else {
      shareCalendar({ id: calendar.id });
    }
  };

  return (
    <Modal isOpen trapFocus={true} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Badge colorScheme="green">New</Badge> Share your calendar
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h2" size="md">
            Generate a calendar link
          </Heading>

          {calendar && (
            <>
              <Paragraph>
                This allows you to add your shifts to your personal agenda, for
                example to{" "}
                <NextLink href="" passHref>
                  <Link isExternal> Google Calendar</Link>
                </NextLink>
                ,{" "}
                <NextLink href="" passHref>
                  <Link isExternal>Outlook</Link>
                </NextLink>{" "}
                or{" "}
                <NextLink href="" passHref>
                  <Link isExternal>Apple Calendar</Link>
                </NextLink>
                . Use the button below to generate a link and follow the
                instructions of your calendar app.
                <br />
              </Paragraph>
              <Paragraph color="gray.500">
                <strong>Bonus</strong>: You can share the link with friends and
                family and they can view your shifts in their personal calendar
                app!
              </Paragraph>

              <Alert status="warning" my={4}>
                <AlertIcon />
                Note: be careful who you share the link with. Anyone with the
                link can view your shifts.
              </Alert>

              <Button
                isLoading={
                  unshareCalendarLoading || shareCalendarLoading || isValidating
                }
                onClick={() => toggleShareCalendar(calendar)}
              >
                {calendar.isShared ? "Unshare" : "Share"} your calendar now
              </Button>

              {calendar.icsUrl && (
                <Alert status="success" my={4}>
                  <AlertIcon />
                  Link: {calendar.icsUrl}
                </Alert>
              )}
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="primary">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
