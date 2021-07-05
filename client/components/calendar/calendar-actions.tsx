import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiShare } from "react-icons/bi";
import { colors } from "../../theme/colors";
import { ViewShareOptionsModal } from "./sharing/view-share-options-modal";

interface Props {
  isEditingCalendar: boolean;
  onChange: () => void;
}

export function CalendarActions({ isEditingCalendar, onChange }: Props) {
  const [showViewShareOptions, setShowViewShareOptions] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <>
      <VStack align="flex-end">
        <Menu matchWidth>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            aria-label="Options"
            variant="outline"
          >
            Actions
          </MenuButton>
          <MenuList bg={colors[colorMode].ui02}>
            <MenuItem icon={<EditIcon />} onClick={onChange}>
              {!isEditingCalendar ? "Edit calendar" : "End edit mode"}
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<BiShare />}
              onClick={() => setShowViewShareOptions(true)}
            >
              <Badge colorScheme="green">New</Badge> View share options
            </MenuItem>
          </MenuList>
        </Menu>

        {isEditingCalendar ? (
          <Text fontSize="xs" color="green.300">
            <strong>Note</strong>: changes are automatically saved.
          </Text>
        ) : (
          <Text fontSize="xs" color="grey">
            ‎
          </Text>
        )}
      </VStack>

      {showViewShareOptions && (
        <ViewShareOptionsModal
          calendarName="default"
          onClose={() => setShowViewShareOptions(false)}
        />
      )}
    </>
  );
}
