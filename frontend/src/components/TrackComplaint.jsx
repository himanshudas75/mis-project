import { Form, Formik } from "formik";
import React from "react";
import FormikControl from "./FormikControl";
import * as Yup from "yup";
import { Button, Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const TrackComplaint = () => {
  const initialValues = {
    entity: "",
    order_no: "",
    registered_email_id: "",
  };
  //   ran into an error
  //saying that '<Formik validationSchema /> TypeError: branch is not a function'
  //resolve this by using a function as the value of then:
  //like then : ()=> Yup.blah blah
  const validationSchema = Yup.object({
    entity: Yup.string().required("Required"),
    order_no: Yup.string().when("entity", {
      is: "order_no",
      then: () => Yup.string().required("Required"),
    }),
    registered_email_id: Yup.string().when("entity", {
      is: "registered_email_id",
      then: () =>
        Yup.string().email("Invalid Email Format").required("Required"),
    }),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const entityOptions = [
    { key: "Order Number", value: "order_no" },
    { key: "Registered Email Id", value: "registered_email_id" },
  ];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <>
            <Box>
              <HStack>
                <Link to="/mba_admission/home">
                  <Button>Back to Applicant Home</Button>
                </Link>
                <Link to="/mba_admission/register_complaint">
                  <Button>Register Complaint</Button>
                </Link>
              </HStack>
            </Box>
            <Box>
              <Form>
                <FormikControl
                  control="radio"
                  label="Select entity"
                  name="entity"
                  options={entityOptions}
                />
                {formik.values.entity === "order_no" && (
                  <FormikControl
                    control="input"
                    label="Please enter the order number"
                    name="order_no"
                    type="text"
                  />
                )}
                {formik.values.entity === "registered_email_id" && (
                  <FormikControl
                    control="input"
                    label="Please enter the Registered Email Id"
                    name="registered_email_id"
                    type="email"
                  />
                )}
                <HStack>
                  <Button type="submit">Track Status</Button>
                  <Button type="reset">Reset</Button>
                </HStack>
              </Form>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};

export default TrackComplaint;
