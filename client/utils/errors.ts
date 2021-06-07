import { AxiosError } from "axios";
import { ErrorOption, FieldName } from "react-hook-form";

export const setFieldValidationErrors = (
  error: AxiosError,
  setError?: (name: string, error: ErrorOption) => void
) => {};
