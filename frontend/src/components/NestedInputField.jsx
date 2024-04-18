//there will be difference in making the form invalid and showing the error messaged in this and
//InputField component

import { React, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { Field } from "formik";
const NestedInputField = (props) => {
  const { label, name, ...rest } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
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
            <InputGroup>
              <Input
                id={name}
                {...rest}
                {...field}
                value={field.value}
                type={
                  rest.type && rest.type === "password"
                    ? show
                      ? "text"
                      : "password"
                    : rest.type
                }
              />
              {rest.type && rest.type === "password" && (
                <InputRightElement width="4.5rem">
                  <Button h="1.5rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
            <FormErrorMessage>
              {form.errors[parentObject] &&
                form.errors[parentObject][childField]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default NestedInputField;
