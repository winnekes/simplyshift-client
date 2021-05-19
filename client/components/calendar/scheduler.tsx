import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Event,
  View,
  NavigateAction,
  stringOrDate,
} from "react-big-calendar";
import { useMutation } from "react-query";
import useSWR from "swr";
import { addShiftEntryMutation } from "../../services/mutations/add-shift-entry";
import { ShiftEntry, ShiftModel } from "../../types";
import { ErrorContainer } from "../common/error-container";
import { ShiftModelsList } from "../shift-models/shift-models-list";
import { Toolbar } from "./toolbar";

export const Scheduler = () => {
  const [selectedTimeframe, setSelectedTimeFrame] = useState(new Date());
  const [isEditingCalendar, setIsEditingCalendar] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  moment.locale("nl", {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const localizer = momentLocalizer(moment);

  const {
    data: shiftEntries,
    error: shiftEntriesError,
    mutate: refetchShiftEntries,
  } = useSWR<ShiftEntry[]>(`/shift-entry?date=${selectedTimeframe}`);

  const { data: shiftModels, error: shiftModelsError } =
    useSWR<ShiftModel[]>("/shift-model");

  const { mutate } = useMutation(addShiftEntryMutation, {
    onSuccess: async () => {
      await refetchShiftEntries();
    },
  });

  const onNavigate = async (date: Date, view: View, action: NavigateAction) => {
    await setSelectedTimeFrame(date);
  };

  function eventStyleGetter(
    event: Event & { color: string },
    start: string | Date,
    end: string | Date,
    isSelected: boolean
  ) {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "20px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        paddingLeft: "10px",
        display: "block",
      },
    };
  }

  function slotPropGetter(date: Date) {
    return {
      className: "red-ttest",
      style: {
        backgroundColor: "red !important",
        color: "#ff0000",
      },
    };
  }

  const onSelectSlot = async (slot: {
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    if (selectedModelId) {
      const modifiedData = {
        shiftModelId: selectedModelId,
        startsAt: moment(slot.start).toLocaleString(),
      };

      await mutate(modifiedData);
    }
  };

  if (shiftEntriesError || shiftModelsError) return <ErrorContainer />;

  const events =
    shiftEntries?.map((shift) => ({
      id: shift.id,
      title: shift.shiftModel.name,
      start: shift.startsAt,
      end: shift.endsAt,
      note: shift.note,
      color: shift.shiftModel.color,
    })) ?? [];

  return (
    <>
      <VStack align="flex-end">
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <FormLabel htmlFor="email-alerts" mb="0">
            Editing mode is {isEditingCalendar ? "on" : "off"}
          </FormLabel>
          <Switch
            id="email-alerts"
            colorScheme="green"
            isChecked={isEditingCalendar}
            onChange={() => setIsEditingCalendar(!isEditingCalendar)}
          />
        </FormControl>
        {isEditingCalendar ? (
          <Text fontSize="xs" color="red">
            <strong>Note</strong>: changes are automatically saved.
          </Text>
        ) : (
          <Text fontSize="xs" color="grey">
            <strong>Note</strong>: go into <strong>Edit mode</strong> to add and
            update your shift calendar.
          </Text>
        )}
      </VStack>

      <BigCalendar
        localizer={localizer}
        events={events}
        date={selectedTimeframe}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        components={{ toolbar: Toolbar }}
        onDrillDown={(e) => console.log({ e })}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={slotPropGetter}
        onNavigate={onNavigate}
        // onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        popup
        selectable
      />
      <Center>
        {isEditingCalendar && (
          <ShiftModelsList
            shiftModels={shiftModels}
            selectedModelId={selectedModelId}
            setSelectedModelId={setSelectedModelId}
          />
        )}
      </Center>
    </>
  );
};
