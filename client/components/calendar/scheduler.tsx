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
import { fetcher } from "../../services/api";
import { addShiftEntryMutation } from "../../services/mutations/add-shift-entry";
import { ShiftEntry } from "../../types";
import { ErrorContainer } from "../common/error-container";
import { ShiftModelsList } from "../shift-models/shift-models-list";

export const Scheduler = () => {
  const [selectedTimeframe, setSelectedTimeFrame] = useState(new Date());
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  const localizer = momentLocalizer(moment);

  const {
    data,
    error,
    mutate: mut,
  } = useSWR<ShiftEntry[]>(`/shift-entry?date=${selectedTimeframe}`, fetcher);

  const { mutate } = useMutation(addShiftEntryMutation, {
    onSuccess: async ({ data }) => {
      await mut();
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

  if (error) return <ErrorContainer />;
  //if (!data) return <Loading />;

  const events =
    data?.map((shift) => ({
      id: shift.id,
      title: shift.shiftModel.name,
      start: shift.startsAt,
      end: shift.endsAt,
      note: shift.note,
      color: shift.shiftModel.color,
    })) ?? [];

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        date={selectedTimeframe}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={slotPropGetter}
        onNavigate={onNavigate}
        // onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        popup
        selectable
      />

      <ShiftModelsList
        selectedModelId={selectedModelId}
        setSelectedModelId={setSelectedModelId}
      />
    </>
  );
};
