import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
//import { AxiosError } from "axios";
import { CirclePicker } from "react-color";
import { useFormContext, Controller } from "react-hook-form";
import { AddShiftModelData } from "../../mutations/add-shift-model";

interface Props {
  errorCode?: string;
}

export const ModelForm = ({ errorCode }: Props) => {
  const {
    register,
    errors,
    control,
    setValue,
  } = useFormContext<AddShiftModelData>();

  // TODO refactor <FormControl> into reusable component, it is too verbose in bigger forms
  return (
    <>
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
          {errorCode === "DUPLICATE_SHIFT_MODEL_NAME" && (
            <Text color="red">
              A shift model with the same name already exists
            </Text>
          )}
          <br />
          {errors?.name?.message} &nbsp;
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Starts at</FormLabel>
        <Input
          type="time"
          name="startsAt"
          ref={register({ required: "This field is required" })}
        />
        <FormHelperText>{errors?.startsAt?.message} &nbsp;</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Ends at</FormLabel>
        <Input
          type="time"
          name="endsAt"
          ref={register({ required: "This field is required" })}
        />
        <FormHelperText>{errors?.endsAt?.message} &nbsp;</FormHelperText>
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
    </>
  );
};
