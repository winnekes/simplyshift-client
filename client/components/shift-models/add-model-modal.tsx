import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import {
  AddShiftModelData,
  addShiftModelMutation,
} from "../../services/mutations/add-shift-model";
import { mutate as fetch } from "swr";
import { colors } from "../../theme/colors";
import { ModalContent } from "../common/overrides/modal";
import { ModelForm } from "./model-form";

type Props = {
  onClose: () => void;
};

export function AddModelModal({ onClose }: Props) {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const defaultValues: AddShiftModelData = {
    name: "Early shift",
    startsAt: "06:00",
    endsAt: "14:00",
    color: "#ffeb3b",
  };

  const methods = useForm<AddShiftModelData>({ defaultValues });

  const { isLoading, mutate, error } = useMutation<
    unknown,
    AxiosError,
    AddShiftModelData,
    unknown
  >(addShiftModelMutation, {
    //onSuccess: () => onClose(),
    onSettled: () => fetch("/shift-model"),
  });

  const onSubmit = methods.handleSubmit((data) => mutate(data));
  console.log({ error });
  return (
    <>
      <Modal isOpen onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent bg={colors[colorMode].ui02}>
          <form onSubmit={onSubmit}>
            <ModalHeader>Add a new shift</ModalHeader>
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
      {error &&
        toast({
          title: "Oops",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        })}
    </>
  );
}
