import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Spacer, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { EventProps } from "react-big-calendar";
import { useMutation } from "react-query";
import { mutate as fetch } from "swr";
import { deleteShiftEntryMutation } from "../../services/mutations/delete-shift-entry";
import { ShiftEntryEvent } from "./scheduler";

type Props = EventProps & {
  event: PropsWithChildren<EventProps<ShiftEntryEvent>>;
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
    <Tooltip
      label={
        <>
          {moment(event.event.start, "HH:mm").format("HH:mm")} -{" "}
          {moment(event.event.end, "HH:mm").format("HH:mm")}
        </>
      }
    >
      <Flex align="center" px={1}>
        <Text fontSize="xs" isTruncated>
          {event.title}
        </Text>
        <Spacer />
        {isEditingCalendar && event.event.id !== 0 && (
          <CloseIcon boxSize="10px" onClick={deleteEvent} />
        )}
      </Flex>
    </Tooltip>
  );
};
