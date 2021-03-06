import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { ToolbarProps } from "react-big-calendar";
import { CalendarActions } from "./calendar-actions";
interface Props {
  toolbar: ToolbarProps;
  isEditingCalendar: boolean;
  onEditMode: () => void;
  setShowViewShareOptions: Dispatch<SetStateAction<boolean>>;
}

export const Toolbar = ({
  toolbar,
  isEditingCalendar,
  onEditMode,
  setShowViewShareOptions,
}: Props) => {
  const gotToPreviousMonth = () => {
    toolbar.date.setMonth(toolbar.date.getMonth());
    toolbar.onNavigate("PREV");
  };
  const goToNextMonth = () => {
    toolbar.date.setMonth(toolbar.date.getMonth());
    toolbar.onNavigate("NEXT");
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setFullYear(now.getFullYear());
    toolbar.onNavigate("TODAY");
  };

  const switchToWeekView = () => {
    toolbar.onView("week");
  };

  const switchToMonthView = () => {
    toolbar.onView("month");
  };

  const SelectedMonthLabel = () => {
    const date = moment(toolbar.date);
    return (
      <Box>
        <Text fontWeight="bold" fontSize="3xl" m={0} p={0}>
          {date.format("MMMM")}{" "}
          <Text as="span" color="green.500">
            {date.format("YYYY")}
          </Text>
        </Text>
      </Box>
    );
  };

  return (
    <>
      <Flex align="start">
        <SelectedMonthLabel />
        <Spacer />
        <CalendarActions
          isEditingCalendar={isEditingCalendar}
          setShowViewShareOptions={setShowViewShareOptions}
          onChange={onEditMode}
        />
      </Flex>
      <Center mt={5}>
        <ButtonGroup size="lg" isAttached variant="ghost" color="green.500">
          <IconButton
            aria-label="Add to friends"
            icon={<ArrowLeftIcon />}
            onClick={gotToPreviousMonth}
          />
          <Button mr="-px" onClick={goToCurrentMonth}>
            Today
          </Button>
          <IconButton
            aria-label="Add to friends"
            icon={<ArrowRightIcon />}
            onClick={goToNextMonth}
          />
        </ButtonGroup>
      </Center>
      <Center mb={4}>
        <ButtonGroup size="xs" isAttached color="green.500" variant="ghost">
          <Button
            mr="-px"
            onClick={switchToWeekView}
            textDecoration={toolbar.view === "week" && "underline"}
          >
            Week view
          </Button>

          <Button
            mr="-px"
            onClick={switchToMonthView}
            textDecoration={toolbar.view === "month" && "underline"}
          >
            Month view
          </Button>
        </ButtonGroup>
      </Center>
    </>
  );
};
