import { Center } from "@chakra-ui/react";
import moment from "moment";
import { ToolbarProps } from "react-big-calendar";

export const Toolbar = (toolbar: ToolbarProps) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth());
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth());
    toolbar.onNavigate("NEXT");
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setFullYear(now.getFullYear());
    toolbar.onNavigate("TODAY");
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <b>{date.format("MMMM")}</b>
        <span> {date.format("YYYY")}</span>
      </span>
    );
  };

  return (
    <Center>
      <label>{label()}</label>

      <div>
        <button onClick={goToBack}>&#8249;</button>
        <button onClick={goToCurrent}>today</button>
        <button onClick={goToNext}>&#8250;</button>
      </div>
    </Center>
  );
};
