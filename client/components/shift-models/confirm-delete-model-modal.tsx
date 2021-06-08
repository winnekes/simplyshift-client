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
import { deleteShiftModelMutation } from "../../mutations/delete-shift-model";
import { ShiftModel } from "../../types";
import { AlertDialogContent } from "../common/overrides/alert-dialog";

interface Props {
  shiftModel: ShiftModel;
  onClose: () => void;
}

export const ConfirmDeleteModelModal = ({ shiftModel, onClose }: Props) => {
  const cancelRef = useRef();

  const { isLoading, mutate } = useMutation(deleteShiftModelMutation, {
    onSuccess: () => onClose(),
    onSettled: () => fetch("/shift-model"),
  });

  const deleteModel = () => mutate({ shiftModelId: shiftModel.id });

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
        <AlertDialogHeader>Delete shift model?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete the model {shiftModel.name}?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="green"
            ml={3}
            onClick={deleteModel}
            isLoading={isLoading}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
