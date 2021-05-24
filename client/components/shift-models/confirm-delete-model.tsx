import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation } from "react-query";
import { mutate as fetch } from "swr";
import { deleteShiftModelMutation } from "../../services/mutations/delete-shift-model";
import { ShiftModel } from "../../types";

type Props = {
  shiftModel: ShiftModel;
  onClose: () => void;
};

export const ConfirmDeleteModel = ({ shiftModel, onClose }: Props) => {
  const cancelRef = useRef();

  const { isLoading, error, mutate } = useMutation(deleteShiftModelMutation, {
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
          <Button colorScheme="red" ml={3} onClick={deleteModel}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
