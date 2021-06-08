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
import { useAuth } from "../../hooks/use-auth";
import { deleteAccountMutation } from "../../mutations/delete-account";
import { AlertDialogContent } from "../common/overrides/alert-dialog";

interface Props {
  onClose: () => void;
}

export const ConfirmDeleteAccountModal = ({ onClose }: Props) => {
  const cancelRef = useRef();

  const { logout } = useAuth();
  const { isLoading, mutate } = useMutation(deleteAccountMutation, {
    onSuccess: async () => {
      logout();
    },
  });

  const deleteAccount = () => {
    mutate();
  };

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
        <AlertDialogHeader>Delete your account</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete your account? <br />
          <strong>
            This action cannot be undone. Your calendar and all your data will
            be deleted.
          </strong>
          <br />
          If you wish to come back you will have to create a new account.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="green"
            ml={3}
            onClick={deleteAccount}
            isLoading={isLoading}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
