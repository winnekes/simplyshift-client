import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation } from "react-query";
import { mutate as fetch } from "swr";
import { addShiftEntryMutation } from "../../services/mutations/add-shift-entry";
import { ShiftModel } from "../../types";
import { AlertDialogContent } from "../common/overrides/alert-dialog";

type Props = {
  newShiftEntryData: { shiftModel: ShiftModel; date: Date };
  onConfirm: (shiftModel: ShiftModel, date: Date) => Promise<void>;
  onClose: () => void;
};

export const ConfirmOverrideShiftEntryModal = ({
  newShiftEntryData: { shiftModel, date },
  onConfirm,
  onClose,
}: Props) => {
  const cancelRef = useRef();

  const { isLoading, error, mutate } = useMutation(addShiftEntryMutation, {
    onSuccess: () => onClose(),
    onSettled: () => fetch("/shift-model"),
  });

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isCentered
      isOpen
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Override?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to override the existing shift entry?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="brand01"
            ml={3}
            onClick={() => onConfirm(shiftModel, date)}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
