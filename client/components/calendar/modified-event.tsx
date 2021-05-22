import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { EventProps } from "react-big-calendar";
import { useMutation } from "react-query";
import { mutate as fetch } from "swr";
import { deleteShiftEntryMutation } from "../../services/mutations/delete-shift-entry";
import { ShiftEntryEvent } from "./scheduler";

type Props = EventProps & {
  shiftEntryId: number;
  events: ShiftEntryEvent[];
  setEvents: Dispatch<SetStateAction<ShiftEntryEvent[]>>;
  selectedTimeframe: Date;
  isEditingCalendar: boolean;
};

export const ModifiedEvent = ({
  event,
  events,
  setEvents,
  shiftEntryId,
  selectedTimeframe,
  isEditingCalendar,
}: Props) => {
  const fetchShiftEntries = () =>
    fetch(`/shift-entry?date=${selectedTimeframe}`);

  const { mutate } = useMutation(deleteShiftEntryMutation, {
    onSettled: () => fetchShiftEntries(),
  });

  const deleteEvent = () => {
    const filteredEvents = events.filter((event) => event.id !== shiftEntryId);
    setEvents(filteredEvents);
    mutate({ shiftEntryId });
  };

  return (
    <Flex align="center" p={1}>
      <Text fontSize="sm">{event.title}</Text>
      <Spacer />
      {isEditingCalendar && <CloseIcon boxSize="10px" onClick={deleteEvent} />}
    </Flex>
  );
};
