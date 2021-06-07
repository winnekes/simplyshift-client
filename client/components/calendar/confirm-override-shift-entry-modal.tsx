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

interface Props {
  newShiftEntryData: { shiftModel: ShiftModel; date: Date };
  onClose: () => void;
}

export const ConfirmOverrideShiftEntryModal = ({
  newShiftEntryData: { shiftModel, date },
  onClose,
}: Props) => {
  const cancelRef = useRef();

  const { isLoading, mutate } = useMutation(addShiftEntryMutation, {
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
            isLoading={isLoading}
            colorScheme="green"
            ml={3}
            onClick={() => mutate({ shiftModelId: shiftModel.id, date })}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
