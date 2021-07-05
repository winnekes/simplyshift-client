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
import useSWR from "swr";
import { Calendar } from "../../../types";
import { ErrorContainer } from "../../common/error-container";
import { Loading } from "../../common/loading";

import { ModalContent } from "../../common/overrides/modal";
import { Paragraph } from "../../common/paragraph";

interface Props {
  calendarName: string;
  onClose: () => void;
}

export function ViewShareOptionsModal({ calendarName, onClose }: Props) {
  // todo fetch calendar information
  // generate link
  // share/unshare feature
  const { data, error } = useSWR<Calendar>(`/calendars/${calendarName}`);

  // const { id, ...rest } = model;
  // const methods = useForm<AddShiftModelData>({ defaultValues: { ...rest } });
  //
  // const { isLoading, mutate } = useMutation(editShiftModelMutation, {
  //   onSuccess: () => onClose(),
  //   onSettled: () => fetch("/shift-model"),
  // });
  //
  // const onSubmit = methods.handleSubmit((data) => mutate({ id, ...data }));

  return (
    <Modal isOpen onClose={onClose} isCentered size="lg">
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
          {error && <ErrorContainer />}
          {!data && <Loading />}
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
            family and they can view your shifts in their personal calendar app!
          </Paragraph>

          <Alert status="warning" my={4}>
            <AlertIcon />
            Note: be careful who you share the link with. Anyone with the link
            can view your shifts.
          </Alert>

          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <FormLabel htmlFor="email-alerts" mb="0">
              {data.isShared ? "Unshare" : "Share"} your calendar now
            </FormLabel>
            <Switch
              id="email-alerts"
              colorScheme="green"
              isChecked={data.isShared}
              // onChange={onChange}
            />
          </FormControl>

          {data.isShared && (
            <Alert status="success" my={4}>
              <AlertIcon />
              Link:
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
