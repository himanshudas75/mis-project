import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Field } from "formik";
const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        return (
          <FormControl
            id={name}
            isInvalid={form.errors[name] && form.touched[name]}
          >
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <RadioGroup {...field} id={name} {...rest}>
              <Stack direction="row">
                {options.map((option) => {
                  return (
                    <Radio
                      key={option.key}
                      {...field}
                      value={option.value}
                      isChecked={option.value === field.value}
                    >
                      {option.key}
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default RadioButton;
