import { Formik } from "formik";
import React from "react";
import FormikControl from "./FormikControl";
import { Button, HStack, Text, VStack, Box } from "@chakra-ui/react";
import * as Yup from "yup";
import { Form } from "formik";
const QualificationDetails = () => {
  const firstSelectOptions = [
    { key: "Please select your priority", value: "" },
    { key: "Dhanbad", value: "dhanbad" },
    { key: "Delhi", value: "delhi" },
    { key: "Online", value: "online" },
  ];
  const genericOptions = [{ key: "Please select your priority", value: "" }];
  const agreementOptions = [
    {
      key: " I  agree that the final location of the interview will be based on the decision of MBA admission committee.",
      value: true,
    },
  ];
  const gradeTypeOptions = [
    { key: "Percentage", value: "percentage" },
    { key: "CGPA (out of 10)", value: "cgpa" },
  ];
  const initialValues = {
    cat_registration_number: "",
    cat_percentile: "",
    cat_quantitative_percentile: "",
    cat_quantitative_score: "",
    cat_verbal_percentile: "",
    cat_verbal_score: "",
    cat_data_interpretation_percentile: "",
    cat_data_interpretation_score: "",
    cat_score: "",
    priority1: "",
    priority2: "",
    priority3: "",
    agreement: "",
    tenth_class: {
      school_name: "",
      result_status: "passed",
      grade_type: "percentage", //percentage or cgpa
      year_of_passing: "",
      score: "", //percentage or cgpa
    },
    // twelfth_class: {
    //   college_name: "",
    //   result_status: "passed",
    //   grade_type: "percentage", //percentage or cgpa
    //   year_of_passing: "",
    //   score: "", //percentage or cgpa
    // },
    // ug: {
    //   name_of_the_exam: "",
    //   college_name: "",
    //   result_status: "",
    //   grade_type: "percentage",
    //   year_of_passing: "",
    //   score: "",
    // },
  };
  const validationSchema = Yup.object({
    cat_registration_number: Yup.string().required("Required"),
    cat_percentile: Yup.string().required("Required"),
    cat_quantitative_percentile: Yup.string().required("Required"),
    cat_quantitative_score: Yup.string().required("Required"),
    cat_verbal_percentile: Yup.string().required("Required"),
    cat_verbal_score: Yup.string().required("Required"),
    cat_data_interpretation_percentile: Yup.string().required("Required"),
    cat_data_interpretation_score: Yup.string().required("Required"),
    cat_score: Yup.string().required("Required"),
    priority1: Yup.string().required("Required"),
    priority2: Yup.string().required("Required"),
    priority3: Yup.string().required("Required"),
    agreement: Yup.string().required("Required"),
    tenth_class: Yup.object({
      school_name: Yup.string().required("Required"),
      result_status: Yup.string().required("Required"),
      grade_type: Yup.string().required("Required"),
      year_of_passing: Yup.string().required("Required"),
      score: Yup.number().when(
        "grade_type",
        {
          is: "percentage",
          then: () => {
            Yup.number().min(1).max(100).required("Required");
          },
        },
        {
          is: "cgpa",
          then: () => {
            Yup.number().min(1).max(10).required("Required");
          },
        }
      ),
    }),
    //write correct validations for score field - it is still being accepted as  a string
    //need to see dyanmic inputs - add pg education fields etc
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
        {
          /* console.log(formik.values); */
        }
        return (
          <Form>
            <FormikControl
              control="input"
              label="Enter your CAT 2024 Registration Number"
              name="cat_registration_number"
            />
            <Text color="red">
              NOTE: Only Numeric Values are allowed in the Registration Number
              Field
            </Text>
            <HStack>
              <VStack>
                <FormikControl
                  control="input"
                  label="CAT Percentile"
                  name="cat_percentile"
                />
                <FormikControl
                  control="input"
                  label="CAT Quantitative Percentile"
                  name="cat_quantitative_percentile"
                />
                <FormikControl
                  control="input"
                  label="CAT Verbal Percentile"
                  name="cat_verbal_percentile"
                />
                <FormikControl
                  control="input"
                  label="CAT Data Interpretation Percentile"
                  name="cat_data_interpretation_percentile"
                />
              </VStack>

              <VStack>
                <FormikControl
                  control="input"
                  label="CAT Score"
                  name="cat_score"
                />

                <FormikControl
                  control="input"
                  label="CAT Quantitative Score"
                  name="cat_quantitative_score"
                />

                <FormikControl
                  control="input"
                  label="CAT Verbal Score"
                  name="cat_verbal_score"
                />

                <FormikControl
                  control="input"
                  label="CAT Data Interpretation Score"
                  name="cat_data_interpretation_score"
                />
              </VStack>
            </HStack>

            <HStack>
              <FormikControl
                control="select"
                label="Priority 1"
                name="priority1"
                options={firstSelectOptions}
              />
              <FormikControl
                control="select"
                label="Priority 2"
                name="priority2"
                options={
                  formik.values.priority1 !== ""
                    ? firstSelectOptions.filter(
                        ({ value }) => value !== formik.values.priority1
                      )
                    : genericOptions
                }
                isDisabled={!formik.values.priority1}
              />
              <FormikControl
                control="select"
                label="Priority 3"
                name="priority3"
                options={
                  formik.values.priority1 !== "" &&
                  formik.values.priority2 !== ""
                    ? firstSelectOptions.filter(
                        ({ value }) =>
                          value !== formik.values.priority1 &&
                          value !== formik.values.priority2
                      )
                    : genericOptions
                }
                isDisabled={!formik.values.priority2}
              />
            </HStack>
            <FormikControl
              control="checkbox"
              label="Consent"
              name="agreement"
              options={agreementOptions}
            />

            <Text>Academic Details</Text>

            <Text color="red">
              NOTE:"All appearing students have to give tentative year of
              passing and marks obtained till last semester."
            </Text>
            <Text color="red">
              "Institute/University Name field must be less than 100 characters
              including space."
            </Text>

            <Box>
              <Text>Details of Class 10th</Text>
              <FormikControl
                control="nestedinput"
                label="Name of the School"
                name="tenth_class.school_name"
              />

              <FormikControl
                control="input"
                label="Result"
                name="tenth_class.result_status"
                isDisabled={true}
              />

              <FormikControl
                control="nestedselect"
                label="Type of Grade"
                name="tenth_class.grade_type"
                options={gradeTypeOptions}
              />

              <FormikControl
                control="nestedinput"
                label="Year of Passing"
                name="tenth_class.year_of_passing"
              />

              <FormikControl
                control="nestedinput"
                label={
                  formik.values.tenth_class.grade_type === "percentage"
                    ? "Enter Percentage"
                    : "Enter CGPA(out of 10)"
                }
                name="tenth_class.score"
              />
            </Box>

            <Button
              type="submit"
              // isDisabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default QualificationDetails;
