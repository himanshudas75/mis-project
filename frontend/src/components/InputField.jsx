import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
const InputField = (props) => {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input id={name} {...rest} {...field} value={field.value} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default InputField;
