import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { Field } from "formik";
const DropDown = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Select id={name} {...field} {...rest}>
              {options.map((option) => {
                return (
                  <option value={option.value} key={option.key}>
                    {option.key}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default DropDown;
