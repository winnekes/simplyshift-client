import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogOverlay,
  AlertDialogBody,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { mutate } from "swr";
import { api } from "../../services/api";
import { ShiftModel } from "../../types";

type Props = {
  shiftModel: ShiftModel;
  onClose: () => void;
};

export const ConfirmDeleteModel = ({ shiftModel, onClose }: Props) => {
  const deleteModel = async () => {
    await api.delete(`/shift-model/${shiftModel.id}`);
    await mutate("/shift-model");
  };

  const cancelRef = useRef();
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
