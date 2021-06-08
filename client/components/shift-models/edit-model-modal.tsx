import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import { AddShiftModelData } from "../../mutations/add-shift-model";
import { mutate as fetch } from "swr";
import { editShiftModelMutation } from "../../mutations/edit-shift-model";
import { ShiftModel } from "../../types";
import { ModalContent } from "../common/overrides/modal";
import { ModelForm } from "./model-form";

interface Props {
  model: ShiftModel;
  onClose: () => void;
}

export function EditModelModal({ model, onClose }: Props) {
  const { id, ...rest } = model;
  const methods = useForm<AddShiftModelData>({ defaultValues: { ...rest } });

  const { isLoading, mutate } = useMutation(editShiftModelMutation, {
    onSuccess: () => onClose(),
    onSettled: () => fetch("/shift-model"),
  });

  const onSubmit = methods.handleSubmit((data) => mutate({ id, ...data }));

  return (
    <Modal isOpen onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Edit shift {model.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...methods}>
              <ModelForm />
            </FormProvider>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" ml={3} isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
