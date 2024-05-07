import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { Button, VStack } from "@chakra-ui/react";
import useUser from "../hooks/useUser.js";
// import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const LoginForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();

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
  const onSubmit = async (values) => {
    console.log(values);
    const data = {
      registration_number: values.registrationnumber,
      password: values.password,
    };
    try {
      const res = await login(data);
      if (res) {
        if (res.success) {
          // enqueueSnackbar('User registered successfully!', {
          //     variant: 'success',
          // });
          navigate("/", { replace: true });
        } else {
          // enqueueSnackbar(res.message, {
          //     variant: 'error',
          // });
        }
      } else {
        // enqueueSnackbar('No response from server', {
        //     variant: 'error',
        // });
      }
    } catch (err) {
      console.error(err);
      // enqueueSnackbar('Something went wrong, please try again', {
      //     variant: 'error',
      // });
    }
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
            <Text
              fontWeight="bold"
              className="red pb-1 text-center text-lg"
              align="center"
            >
              Login Form
            </Text>
            <VStack align="center">
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

              <Button
                type="submit"
                isDisabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
