import { Field, Formik, Form } from "formik";
import React from "react";
import FormikControl from "./FormikControl";
import * as Yup from "yup";
import { Button, VStack, HStack } from "@chakra-ui/react";
``;
const RegisterComplaint = (props) => {
  const initialValues = {
    order_no: "",
    contact_no: "",
    complaint_type: "",
    complaint_details: "",
    registered_email_id: "",
    payment_type: "",
  };
  const validFileExtensions = { types: ["jpg", "png", "pdf"] };
  //   input file validations is not done yet
  //   const isValidFileType = (fileName, fileType) => {
  //     return (
  //       fileName &&
  //       validFileExtensions[fileType].indexOf(fileName.split(".")) > -1
  //     );
  //   };
  const validationSchema = Yup.object({
    order_no: Yup.string().required("Required"),
    contact_no: Yup.string().required("Required"),
    complaint_type: Yup.string().required("Required"),
    complaint_details: Yup.string().required("Required"),
    registered_email_id: Yup.string()
      .email("Invalid Email Format")
      .required("Required"),
    payment_type: Yup.string().required("Required"),
    // payment_screenshot: Yup.mixed()
    //   .required("Required")
    //   .test("is-valid-type", "Not a valid image or pdf file", (value) =>
    //     isValidFileType(value && value.name.toLowerCase(), "types")
    //   ),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const complaintTypeOptions = [
    { key: "Select Complaint Type", value: "" },
    {
      key: "Amount deducted but payment failed",
      value: "amount_deducted_but_payment_failed",
    },
    {
      key: "Amount being displayed is incorrect",
      value: "amount_being_displayed_is_incorrect",
    },
    {
      key: "Payment website is not working",
      value: "payment_website_is_not_working",
    },
  ];
  const paymentTypeOptions = [
    { key: "Select Payment Type", value: "" },
    {
      key: "MBA Application Fee",
      value: "mba_application_fee",
    },
  ];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <HStack>
              <VStack>
                <FormikControl
                  control="input"
                  label="Order Numer (Please enter NA if the order number is not available)"
                  name="order_no"
                  type="text"
                  placeholder="please enter the order number"
                />
                <FormikControl
                  control="input"
                  label="Registered Contact number"
                  name="contact_no"
                  type="text"
                  placeholder="please enter the registered contact number"
                />
                <FormikControl
                  control="select"
                  label="Complaint Type"
                  name="complaint_type"
                  options={complaintTypeOptions}
                  type="select"
                />
              </VStack>

              <VStack>
                <FormikControl
                  control="input"
                  label="Registered Email Id"
                  name="registered_email_id"
                  type="email"
                  placeholder="please enter the registered email id"
                />

                <FormikControl
                  control="select"
                  label="Payment Type"
                  name="payment_type"
                  type="select"
                  options={paymentTypeOptions}
                />

                <FormikControl
                  control="input"
                  label="Upload Screenshot of the payment (image or pdf, max size 1MB)"
                  name="payment_screenshot"
                  type="file"
                />
              </VStack>
            </HStack>

            <FormikControl
              control="textarea"
              label="Complaint Details"
              name="complaint_details"
              type="textarea"
              placeholder="Please breifly describe your issue along with all the details"
            />

            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterComplaint;
