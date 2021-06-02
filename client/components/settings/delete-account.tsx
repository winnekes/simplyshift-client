import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmDeleteAccountModal } from "./confirm-delete-account-modal";

export const DeleteAccount = () => {
  const [showConfirmDeleteAccountModal, setShowConfirmDeleteAccountModal] =
    useState(false);
  return (
    <>
      <Button
        variant="link"
        colorScheme="red"
        onClick={() => setShowConfirmDeleteAccountModal(true)}
      >
        Delete account
      </Button>
      {showConfirmDeleteAccountModal && (
        <ConfirmDeleteAccountModal
          onClose={() => setShowConfirmDeleteAccountModal(false)}
        />
      )}
    </>
  );
};
