import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormHelperText,
  useColorMode,
} from "@chakra-ui/react";
import { CirclePicker } from "react-color";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import {
  AddShiftModelData,
  addShiftModelMutation,
} from "../../services/mutations/add-shift-model";
import { mutate as fetch } from "swr";
import { colors } from "../../theme/colors";
import { ModalContent } from "../common/overrides/modal";

type Props = {
  onClose: () => void;
};

// todo extract form for edit and add model
export function AddModelModal({ onClose }: Props) {
  const { colorMode } = useColorMode();
  const { register, handleSubmit, errors, setValue, control } =
    useForm<AddShiftModelData>();

  // todo use isloading and error
  const { isLoading, error, mutate } = useMutation(addShiftModelMutation, {
    onSuccess: () => onClose(),
    onSettled: () => fetch("/shift-model"),
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <Modal isOpen onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent bg={colors[colorMode].ui02}>
        <form onSubmit={onSubmit}>
          <ModalHeader>Add a new shift</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Night shift"
                  name="name"
                  ref={register({ required: "This field is required" })}
                />
              </InputGroup>
              <FormHelperText>
                {errors.name && errors.name.message} &nbsp;
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Starts at</FormLabel>
              <Input
                type="time"
                name="startsAt"
                ref={register({ required: "This field is required" })}
              />
              <FormHelperText>
                {errors.startsAt && errors.startsAt.message} &nbsp;
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Ends at</FormLabel>
              <Input
                type="time"
                name="endsAt"
                ref={register({ required: "This field is required" })}
              />
              <FormHelperText>
                {errors.endsAt && errors.endsAt.message} &nbsp;
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Color</FormLabel>
              <Controller
                control={control}
                name="color"
                render={({ value, ref }) => (
                  <CirclePicker
                    ref={ref}
                    color={value}
                    width="100%"
                    onChange={(color) => {
                      setValue("color", color.hex);
                    }}
                  />
                )}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" ml={3}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
