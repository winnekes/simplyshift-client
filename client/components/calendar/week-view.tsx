import * as dates from "date-arithmetic";
import React, { FunctionComponent } from "react";
import { NavigateAction, WeekProps } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

interface Week {
  range: (date: Date) => Date[];
  navigate: (date: Date, action: NavigateAction) => Date;
  title: (date: Date) => string;
}

export const WeekView: FunctionComponent<WeekProps> & Week = (props) => {
  const { date } = props;
  const range = WeekView.range(date);

  return <TimeGrid {...props} range={range} eventOffset={15} />;
};

WeekView.range = (date) => {
  const start = date;
  const end = dates.add(start, 2, "day");

  const range = [];
  let current = start;

  while (dates.lte(current, end, "day")) {
    range.push(current);
    current = dates.add(current, 1, "day");
  }

  return range;
};

WeekView.navigate = (date, action) => {
  switch (action) {
    case "PREV":
      return dates.add(date, -3, "day");

    case "NEXT":
      return dates.add(date, 3, "day");

    default:
      return date;
  }
};

WeekView.title = (date) => {
  return `My awesome week: ${date.toLocaleDateString()}`;
};
