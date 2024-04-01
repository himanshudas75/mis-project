import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { HStack, VStack } from "@chakra-ui/react";
const RegistrationFrom = () => {
  const categoryOptions = [
    { key: "Please Select Your Category", value: "" },
    { key: "General", value: "general" },
    { key: "OBC(NCL)", value: "obcncl" },
    { key: "EWS", value: "ews" },
    { key: "SC", value: "sc" },
    { key: "ST", value: "st" },
  ];
  const divyangOptions = [
    { key: "Please Select Divyang", value: "" },
    { key: "Yes", value: true },
    { key: "No", value: false },
  ];
  const btechRadioOptions = [
    { key: "Yes", value: "true" },
    { key: "No", value: "false" },
  ];
  const initialValues = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    category: "",
    mobilenumber: "",
    divyang: "",
    dob: "",
    btechdegree: "",
    mathorstatdegree: "",
  };
  const validationSchema = Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    middlename: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    category: Yup.string().required("Required"),
    mobilenumber: Yup.string()
      .length(10, "Phone number need to be 10 numbers")
      .required("Required"),
    divyang: Yup.boolean().required("Required"),
    dob: Yup.date().required("Required"),
    btechdegree: Yup.boolean().required("Required"),
    mathorstatdegree: Yup.string().when("btechdegree", {
      is: "false",
      then: Yup.string().required("Required"),
    }),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <HStack spacing="40px" mb="5px">
              <VStack>
                <FormikControl
                  control="input"
                  label="First Name"
                  name="firstname"
                  type="text"
                />

                <FormikControl
                  control="input"
                  label="Last Name"
                  name="lastname"
                  type="text"
                />

                <FormikControl
                  control="select"
                  label="Divyang"
                  name="divyang"
                  options={divyangOptions}
                />
                <FormikControl
                  control="input"
                  label="Email"
                  name="email"
                  type="email"
                />

                <FormikControl
                  control="radio"
                  label="Do you have a B.Tech Degree ?"
                  name="btechdegree"
                  options={btechRadioOptions}
                />
                {formik.values.btechdegree === "false" && (
                  <FormikControl
                    control="radio"
                    label="Do you have a Bachelor's degree with mathematics or statistics as subject?"
                    name="mathorstatdegree"
                    options={btechRadioOptions}
                  />
                )}
              </VStack>

              <VStack>
                <FormikControl
                  control="input"
                  label="Middle Name"
                  name="middlename"
                  type="text"
                />

                <FormikControl
                  control="input"
                  label="Mobile Number"
                  name="mobilenumber"
                />
                <FormikControl
                  control="select"
                  label="Category"
                  name="category"
                  options={categoryOptions}
                />

                <FormikControl
                  control="input"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                />
              </VStack>
            </HStack>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegistrationFrom;
