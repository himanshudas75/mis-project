import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import FormikControl from "./FormikControl";
import { ArrowDownIcon } from "@chakra-ui/icons";
const ArrayField = (props) => {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FieldArray name={name}>
              {(fieldArrayprops) => {
                const { push, form, pop } = fieldArrayprops;
                const { values } = form;
                const { workflow } = values;
                return (
                  <div>
                    {workflow.map((entity, index, arr) => {
                      return (
                        <React.Fragment key={index}>
                          {index > 0 && <ArrowDownIcon />}
                          <FormikControl
                            control="input"
                            name={`workflow[${index}]`}
                            isRequired={true}
                          />
                        </React.Fragment>
                      );
                    })}
                    {workflow.length > 1 && (
                      <Button type="button" onClick={() => pop()}>
                        -
                      </Button>
                    )}
                    <Button type="button" onClick={() => push("")}>
                      +
                    </Button>
                  </div>
                );
              }}
            </FieldArray>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default ArrayField;
