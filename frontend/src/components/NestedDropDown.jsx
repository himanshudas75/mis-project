import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { Field } from "formik";
const NestedDropDown = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        let nameComponents = name.split(".");
        const [parentObject, childField] = nameComponents;
        return (
          <FormControl
            isInvalid={
              form.errors[parentObject] &&
              form.errors[parentObject][childField] &&
              form.touched[parentObject] &&
              form.touched[parentObject][childField]
            }
          >
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
            <FormErrorMessage>
              {" "}
              {form.errors[parentObject] &&
                form.errors[parentObject][childField]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default NestedDropDown;
