import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "./FormikControl";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
const Test = () => {
  const stateOptions = [
    { key: "Please select your state", value: "" },
    { key: "Andhra Pradesh", value: "andhra_pradesh" },
    { key: "Arunachal Pradesh", value: "arunachal_pradesh" },
    { key: "Assam", value: "assam" },
    { key: "Bihar", value: "bihar" },
    { key: "Chhattisgarh", value: "chhattisgarh" },
    { key: "Goa", value: "goa" },
    { key: "Gujarat", value: "gujarat" },
    { key: "Haryana", value: "haryana" },
    { key: "Himachal Pradesh", value: "himachal_pradesh" },
    { key: "Jammu and Kashmir", value: "jammu_and_kashmir" },
    { key: "Jharkhand", value: "jharkhand" },
    { key: "Karnataka", value: "karnataka" },
    { key: "Kerala", value: "kerala" },
    { key: "Madhya Pradesh", value: "madhya_pradesh" },
    { key: "Maharashtra", value: "maharashtra" },
    { key: "Manipur", value: "manipur" },
    { key: "Meghalaya", value: "meghalaya" },
    { key: "Mizoram", value: "mizoram" },
    { key: "Nagaland", value: "nagaland" },
    { key: "Odisha", value: "odisha" },
    { key: "Punjab", value: "punjab" },
    { key: "Rajasthan", value: "rajasthan" },
    { key: "Sikkim", value: "sikkim" },
    { key: "Tamil Nadu", value: "tamil_nadu" },
    { key: "Telangana", value: "telangana" },
    { key: "Tripura", value: "tripura" },
    { key: "Uttarakhand", value: "uttarakhand" },
    { key: "Uttar Pradesh", value: "uttar_pradesh" },
    { key: "West Bengal", value: "west_bengal" },
    {
      key: "Andaman and Nicobar Islands",
      value: "andaman_and_nicobar_islands",
    },
    { key: "Chandigarh", value: "chandigarh" },
    { key: "Dadra and Nagar Haveli", value: "dadra_and_nagar_haveli" },
    { key: "Daman and Diu", value: "daman_and_diu" },
    { key: "Delhi", value: "delhi" },
    { key: "Lakshadweep", value: "lakshadweep" },
    { key: "Puducherry", value: "puducherry" },
  ];
  const checkboxOptions = [
    { key: "same as correspondence address", value: true },
  ];
  const initialValues = {
    correspondence_address: {
      line1: "",
      line2: "",
      line3: "",
      city_and_district: "",
      state: "",
      pincode: "",
      country: "",
    },
    permanent_address: {
      line1: "",
      line2: "",
      line3: "",
      city_and_district: "",
      state: "",
      pincode: "",
      country: "",
    },
    sameaddress: "",
  };
  //   const validationSchema = Yup.object().shape({
  //     correspondence_address: Yup.object().shape({
  //       line1: Yup.string().required("Required"),
  //       line2: Yup.string(),
  //       line3: Yup.string(),
  //       city_and_district: Yup.string().required("Required"),
  //       state: Yup.string().required("Required"),
  //       pincode: Yup.string().required("Required"),
  //       country: Yup.string().required("Required"),
  //     }),
  //     permanent_address: Yup.object().shape({
  //       line1: Yup.string().required("Required"),
  //       line2: Yup.string(),
  //       line3: Yup.string(),
  //       city_and_district: Yup.string().required("Required"),
  //       state: Yup.string().required("Required"),
  //       pincode: Yup.string().required("Required"),
  //       country: Yup.string().required("Required"),
  //     }),
  //     sameaddress: Yup.string(),
  //   });
  const validationSchema = Yup.object({
    correspondence_address: Yup.object({
      line1: Yup.string().required("Required"),
    }),
    sameaddress: Yup.string().required("req"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Text>Personal Details</Text>
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
                  <Text>Correspondence address</Text>
                  <FormikControl
                    control="nestedinput"
                    name="correspondence_address.line1"
                    type="text"
                    label="Line 1 Address"
                  />

                  <FormikControl
                    control="nestedinput"
                    name="correspondence_address.line2"
                    type="text"
                    label="Line 2 Address"
                  />
                  <FormikControl
                    control="nestedinput"
                    name="correspondence_address.line3"
                    type="text"
                    label="Line 3 Address"
                  />

                  <FormikControl
                    control="nestedinput"
                    name="correspondence_address.city_and_district"
                    type="text"
                    label="Enter City and District"
                  />

                  <FormikControl
                    control="select"
                    name="correspondence_address.state"
                    type="select"
                    label="Select State"
                    options={stateOptions}
                  />

                  <FormikControl
                    control="nestedinput"
                    name="correspondence_address.pincode"
                    type="text"
                    label="Enter Pincode"
                  />

                  <FormikControl
                    control="nestedinput"
                    name="correspondence_address.country"
                    type="text"
                    label="Enter Country"
                  />
                </VStack>

                <VStack>
                  <Text>Permanent address</Text>
                  <FormikControl
                    control="checkbox"
                    label=" "
                    name="sameaddress"
                    options={checkboxOptions}
                  />
                  <FormikControl
                    control="nestedinput"
                    name="permanent_address.line1"
                    type="text"
                    label="Line 1 Address"
                  />

                  <FormikControl
                    control="nestedinput"
                    name="permanent_address.line2"
                    type="text"
                    label="Line 2 Address"
                  />
                  <FormikControl
                    control="nestedinput"
                    name="permanent_address.line3"
                    type="text"
                    label="Line 3 Address"
                  />

                  <FormikControl
                    control="nestedinput"
                    name="permanent_address.city_and_district"
                    type="text"
                    label="Enter City and District"
                  />

                  <FormikControl
                    control="select"
                    name="permanent_address.state"
                    type="select"
                    label="Select State"
                    options={stateOptions}
                  />

                  <FormikControl
                    control="nestedinput"
                    name="permanent_address.pincode"
                    type="text"
                    label="Enter Pincode"
                  />

                  <FormikControl
                    control="nestedinput"
                    name="permanent_address.country"
                    type="text"
                    label="Enter Country"
                  />
                </VStack>
              </HStack>
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Test;
