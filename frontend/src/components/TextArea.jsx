import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Field } from "formik";
const TextArea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
              as="textarea"
              id={name}
              {...field}
              {...rest}
              value={field.value}
            />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default TextArea;
