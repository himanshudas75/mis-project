import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { VStack } from "@chakra-ui/react";
const LoginForm = () => {
  const initialValues = {
    registrationnumber: "",
    password: "",
    cnfpassword: "",
  };
  const validationSchema = Yup.object({
    registrationnumber: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    cnfpassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <VStack>
              <FormikControl
                control="input"
                label="Registration Number"
                name="registrationnumber"
              />

              <FormikControl
                control="input"
                label="Password"
                name="password"
                type="password"
              />

              <FormikControl
                control="input"
                label="Confirm Password"
                name="cnfpassword"
                type="password"
              />

              <button type="submit">Login</button>
              <button type="button">Forgot Your Password?</button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
