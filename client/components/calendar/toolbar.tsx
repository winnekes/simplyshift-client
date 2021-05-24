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
import { ToolbarProps } from "react-big-calendar";
import { EditModeSettings } from "./edit-mode-settings";

type Props = {
  toolbar: ToolbarProps;
  isEditingCalendar: boolean;
  onEditMode: () => void;
};

export const Toolbar = ({ toolbar, isEditingCalendar, onEditMode }: Props) => {
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
          <Text as="span" color="brand01.100">
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
        <EditModeSettings
          isEditingCalendar={isEditingCalendar}
          onChange={onEditMode}
        />
      </Flex>
      <Center mt={5}>
        <ButtonGroup size="lg" isAttached variant="ghost" color="brand01.100">
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
        <ButtonGroup size="xs" isAttached color="brand01.100" variant="ghost">
          <Button mr="-px" onClick={switchToWeekView}>
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
