import { Box, useColorMode } from "@chakra-ui/react";
import moment from "moment";
import "moment-timezone";
import "moment/locale/en-gb";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  Calendar as BigCalendar,
  Event,
  EventProps,
  stringOrDate,
} from "react-big-calendar";
import { useMutation } from "react-query";
import useSWR from "swr";
import { addShiftEntryMutation } from "../../mutations/add-shift-entry";
import { ShiftEntry, ShiftModel } from "../../types";
import { ErrorContainer } from "../common/error-container";
import { ShiftModelsList } from "../shift-models/shift-models-list";
import { ConfirmOverrideShiftEntryModal } from "./confirm-override-shift-entry-modal";
import { ModifiedEvent } from "./modified-event";
import {
  createLocalShiftEntryEvent,
  isConflictingTimeslot,
  localizer,
  slotPropGetter,
} from "./scheduler-utils";
import { ViewShareOptionsModal } from "./sharing/view-share-options-modal";
import { Toolbar } from "./toolbar";
import { WeekView } from "./week-view";

export type ShiftEntryEvent = Event & { id: number; color: string };

export const Scheduler = () => {
  const { colorMode } = useColorMode();
  const [events, setEvents] = useState<ShiftEntryEvent[]>([]);
  const [selectedTimeframe, setSelectedTimeFrame] = useState(new Date());
  const [isEditingCalendar, setIsEditingCalendar] = useState(false);
  const [showViewShareOptions, setShowViewShareOptions] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [newShiftEntryData, setNewShiftEntryData] = useState<{
    shiftModel: ShiftModel;
    date: Date;
  }>();

  const [
    showConfirmOverrideShiftEntryModal,
    setShowConfirmOverrideShiftEntryModal,
  ] = useState(false);

  const {
    data: shiftEntries,
    error: shiftEntriesError,
    mutate: fetchShiftEntries,
  } = useSWR<ShiftEntry[]>(`/shift-entry?date=${selectedTimeframe}`);

  const { data: shiftModels, error: shiftModelsError } = useSWR<ShiftModel[]>(
    "/shift-model"
  );

  const { mutate } = useMutation(addShiftEntryMutation, {
    onSettled: async () => {
      await fetchShiftEntries();
    },
  });

  useEffect(() => {
    if (shiftEntries) {
      setEvents(
        shiftEntries.map((shift) => ({
          id: shift.id,
          title: shift.shiftModel.name,
          start: moment(shift.startsAt).toDate(),
          end: moment(shift.endsAt).toDate(),
          note: shift.note,
          color: `${shift.shiftModel.color}aa`,
        }))
      );
    }
  }, [shiftEntries]);

  if (shiftEntriesError || shiftModelsError) {
    return <ErrorContainer />;
  }

  const eventStyleGetter = (event: ShiftEntryEvent) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "20px",
        color: `${colorMode === "dark" ? "white" : "black"}`,
        fontSize: "12px",
        border: "0px",
        paddingLeft: "10px",
      },
    };
  };

  const createShiftEntry = async (date: Date) => {
    const shiftModel = shiftModels.find(
      (model) => model.id === selectedModelId
    );

    if (!shiftModel) {
      throw new Error("Could not find shift model");
    }

    //  ask for override and save to server conditionally
    if (isConflictingTimeslot(date, shiftModel, shiftEntries)) {
      setNewShiftEntryData({
        shiftModel,
        date,
      });

      setShowConfirmOverrideShiftEntryModal(true);
      return;
    }

    mutate({ shiftModelId: shiftModel.id, date });

    const newShiftEntry = createLocalShiftEntryEvent(shiftModel, date);
    setEvents([...events, newShiftEntry]);
  };

  const onSelectSlot = async (slot: {
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    if (selectedModelId) {
      const startsAt = moment(slot.start).toDate();
      await createShiftEntry(startsAt);
    }
  };

  const onNavigate = async (date: Date) => {
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

  const components = {
    toolbar(toolbar) {
      return (
        <Toolbar
          toolbar={toolbar}
          isEditingCalendar={isEditingCalendar}
          onEditMode={onEditMode}
          setShowViewShareOptions={setShowViewShareOptions}
        />
      );
    },

    event(event: PropsWithChildren<EventProps<ShiftEntryEvent>>, title) {
      return (
        <ModifiedEvent
          shiftEntryId={event.event.id}
          events={events}
          setEvents={setEvents}
          selectedTimeframe={selectedTimeframe}
          event={event}
          title={title}
          isEditingCalendar={isEditingCalendar}
        />
      );
    },
  };

  return (
    <>
      <Box mb={7}>
        <BigCalendar
          localizer={localizer}
          events={events}
          date={selectedTimeframe}
          startAccessor="start"
          endAccessor="end"
          tooltipAccessor={null}
          showMultiDayTimes={true}
          culture="en-gb"
          timeslots={1}
          selectable
          dayLayoutAlgorithm="no-overlap"
          style={{ height: 600 }}
          views={{ week: WeekView, month: true }}
          components={components}
          drilldownView="week"
          eventPropGetter={eventStyleGetter}
          dayPropGetter={slotPropGetter}
          onNavigate={onNavigate}
          onSelectSlot={onSelectSlot}
        />
      </Box>

      {isEditingCalendar && (
        <ShiftModelsList
          shiftModels={shiftModels}
          selectedModelId={selectedModelId}
          setSelectedModelId={setSelectedModelId}
        />
      )}

      {showConfirmOverrideShiftEntryModal && (
        <ConfirmOverrideShiftEntryModal
          newShiftEntryData={newShiftEntryData}
          onClose={() => setShowConfirmOverrideShiftEntryModal(false)}
        />
      )}

      {showViewShareOptions && (
        <ViewShareOptionsModal
          calendarName="default"
          onClose={() => setShowViewShareOptions(false)}
        />
      )}
    </>
  );
};
