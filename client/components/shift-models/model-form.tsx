import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { CirclePicker } from "react-color";
import { useFormContext, Controller } from "react-hook-form";
import { AddShiftModelData } from "../../services/mutations/add-shift-model";

export const ModelForm = () => {
  const { register, errors, control, setValue, getValues } =
    useFormContext<AddShiftModelData>();

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
          {errors.name && errors.name.message} &nbsp;
        </FormHelperText>
      </FormControl>
      `
      <FormControl>
        `<FormLabel>Starts at</FormLabel>
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
    </>
  );
};
