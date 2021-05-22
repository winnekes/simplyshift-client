import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Event,
  View,
  NavigateAction,
  stringOrDate,
  EventProps,
} from "react-big-calendar";
import { useMutation } from "react-query";
import useSWR from "swr";
import { addShiftEntryMutation } from "../../services/mutations/add-shift-entry";
import { ShiftEntry, ShiftModel } from "../../types";
import { ErrorContainer } from "../common/error-container";
import { ShiftModelsList } from "../shift-models/shift-models-list";
import { EditModeSettings } from "./edit-mode-settings";
import { Toolbar } from "./toolbar";
import { ModifiedEvent } from "./modified-event";
import {
  createShiftEntryEvent,
  eventStyleGetter,
  slotPropGetter,
} from "./scheduler-utils";

export type ShiftEntryEvent = Event & { id: number; color: string };

export const Scheduler = () => {
  const [events, setEvents] = useState<ShiftEntryEvent[]>([]);
  const [selectedTimeframe, setSelectedTimeFrame] = useState(new Date());
  const [isEditingCalendar, setIsEditingCalendar] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const { mutate } = useMutation(addShiftEntryMutation, {
    onSuccess: async () => {
      await refetchShiftEntries();
    },
  });
  const {
    data: shiftEntries,
    error: shiftEntriesError,
    mutate: refetchShiftEntries,
  } = useSWR<ShiftEntry[]>(`/shift-entry?date=${selectedTimeframe}`);

  const { data: shiftModels, error: shiftModelsError } =
    useSWR<ShiftModel[]>("/shift-model");

  if (shiftEntriesError || shiftModelsError) return <ErrorContainer />;

  useEffect(() => {
    if (shiftEntries) {
      setEvents(
        shiftEntries.map((shift) => ({
          id: shift.id,
          title: shift.shiftModel.name,
          start: shift.startsAt,
          end: shift.endsAt,
          note: shift.note,
          color: shift.shiftModel.color,
        }))
      );
    }
  }, [shiftEntries]);

  const onSelectSlot = async (slot: {
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    if (selectedModelId) {
      const startsAt = moment(slot.start);
      const shiftModel = shiftModels.find(
        (model) => model.id === selectedModelId
      );
      if (!shiftModel) {
        throw new Error("Could not find shift model");
      }

      const modifiedData = {
        shiftModelId: shiftModel.id,
        startsAt: startsAt.toLocaleString(),
      };

      await mutate(modifiedData);

      const newShiftEntry = createShiftEntryEvent(
        shiftModel,
        startsAt.toDate()
      );
      setEvents([...events, newShiftEntry]);
    }
  };

  const onNavigate = async (date: Date, view: View, action: NavigateAction) => {
    await setSelectedTimeFrame(date);
  };

  const onEditMode = () => {
    if (!isEditingCalendar) {
      setIsEditingCalendar(true);
    } else {
      setIsEditingCalendar(false);
      setSelectedModelId(null);
    }
  };

  moment.locale("nl", {
    week: {
      dow: 1,
      doy: 1,
    },
  });

  const localizer = momentLocalizer(moment);
  return (
    <>
      <Box my={7}>
        <BigCalendar
          localizer={localizer}
          events={events}
          date={selectedTimeframe}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["month"]}
          components={{
            toolbar: (toolbar) => (
              <Toolbar
                toolbar={toolbar}
                isEditingCalendar={isEditingCalendar}
                onEditMode={onEditMode}
              />
            ),
            event: (
              event: PropsWithChildren<EventProps<ShiftEntryEvent>>,
              title
            ) => (
              <ModifiedEvent
                shiftEntryId={event.event.id}
                events={events}
                setEvents={setEvents}
                selectedTimeframe={selectedTimeframe}
                event={event}
                title={title}
                isEditingCalendar={isEditingCalendar}
              />
            ),
          }}
          onDrillDown={(e) => console.log({ e })}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={slotPropGetter}
          onNavigate={onNavigate}
          // onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          popup
          selectable
        />
      </Box>
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
