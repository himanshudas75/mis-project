import React from "react";
import { Field } from "formik";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
const CheckBoxField = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {options.map((option) => {
              return (
                <Checkbox
                  key={option.key}
                  value={option.value}
                  {...field}
                  {...rest}
                >
                  {option.key}
                </Checkbox>
              );
            })}
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CheckBoxField;
