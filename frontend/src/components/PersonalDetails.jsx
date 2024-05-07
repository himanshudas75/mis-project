import { React, useRef, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "./FormikControl";
import { Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import useApplication from "../hooks/useApplication.js";
import useUser from "../hooks/useUser.js";

const PersonalDetails = ({ moveToNext }) => {
  const { submit } = useApplication();
  const { getDetails } = useUser();

  const init = {
    applicant_name: "", //should be prefilled
    registration_no: "", //should be prefilled
    guardian_name: "",
    guardian_mobile_no: "",
    relationship_of_guardian: "",
    category: "", //should be pre filled
    pwd: "", //should be pre filled
    nationality: "Indian", //should be pre filled
    religion: "",
    marital_status: "",
    dob: "", //should be pre filled
    email: "", //should be pre filled
    mobile_no: "", //should be pre filled
    aadhaar_no: "",
    gender: "",
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
  };
  const [initialValues, setInitialValues] = useState(init);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDetails();
        const prefilled = res.user;
        const new_values = {
          ...initialValues,
          applicant_name: prefilled?.first_name + " " + prefilled?.last_name,
          registration_no: prefilled?.registration_number,
          category: prefilled?.category,
          pwd: prefilled?.divyang,
          dob: new Date(prefilled?.date_of_birth).toLocaleDateString(),
          email: prefilled?.email,
          mobile_no: prefilled?.mobile_number,
        };
        console.log(new_values);
        setInitialValues((prev) => new_values);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const religionOptions = [
    { key: "Please select your Religion", value: "" },
    { key: "Hindu", value: "hindu" },
    { key: "Christian", value: "christian" },
    { key: "Buddhist", value: "buddhist" },
    { key: "Muslim", value: "muslim" },
    { key: "Sikh", value: "sikh" },
    { key: "Other", value: "other" },
  ];
  const martialStatusOptions = [
    { key: "Please select your Marital Status", value: "" },
    { key: "Married", value: "married" },
    { key: "UnMarried", value: "unmarried" },
    { key: "Widowed", value: "widowed" },
    { key: "Divorced", value: "divorced" },
    { key: "Other", value: "other" },
  ];
  const genderOptions = [
    { key: "Please select your gender", value: "" },
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
    { key: "Transgender", value: "transgender" },
    { key: "Other", value: "other" },
  ];
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

  const validationSchema = Yup.object({
    guardian_name: Yup.string().required("Required"),
    guardian_mobile_no: Yup.string().required("Required"),
    relationship_of_guardian: Yup.string().required("Required"),
    religion: Yup.string().required("Required"),
    marital_status: Yup.string().required("Required"),
    aadhaar_no: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    applicant_name: Yup.string(),
    pwd: Yup.string(),
    dob: Yup.date("not a date"),
    mobile_no: Yup.string(),
    registration_no: Yup.string(),
    category: Yup.string(),
    nationality: Yup.string(),
    email: Yup.string().email("Invalid email format").required("Required"),
    correspondence_address: Yup.object({
      line1: Yup.string().required("Required"),
      line2: Yup.string(),
      line3: Yup.string(),
      city_and_district: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pincode: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
    permanent_address: Yup.object({
      line1: Yup.string().required("Required"),
      line2: Yup.string(),
      line3: Yup.string(),
      city_and_district: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      pincode: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
  });
  const handleFinalSubmit = async (values) => {
    console.log(values);
    values.steps_reached = 1;
    try {
      const res = await submit(values);
      // console.log(values);
      if (res) {
        if (res.success) {
          // enqueueSnackbar('User registered successfully!', {
          //     variant: 'success',
          // });
          moveToNext();
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
    <>
      <Text
        fontWeight="bold"
        className="bg-white text-md pb-1 text-center"
        align="center"
      >
        Personal Details
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          {
            /* console.log(formik);  */
          }
          return (
            <>
              <VStack align="center">
                <Form>
                  <HStack spacing={10}>
                    <VStack spacing={5}>
                      {/* should be pre filled and disabled */}
                      <FormikControl
                        control="input"
                        label="Applicant's Name"
                        name="applicant_name"
                        type="text"
                      />

                      <FormikControl
                        control="input"
                        label="Name of the Parent/Guardian"
                        name="guardian_name"
                        type="text"
                      />

                      <FormikControl
                        control="input"
                        label="Relationship of Parent/Guardian"
                        name="relationship_of_guardian"
                        type="text"
                      />

                      {/* should be pre filled and disabled */}

                      <FormikControl
                        control="input"
                        label="PWD"
                        name="pwd"
                        type="text"
                      />

                      <FormikControl
                        control="select"
                        label="Religion"
                        name="religion"
                        type="select"
                        options={religionOptions}
                      />
                      {/* should be pre filled and disabled */}

                      <FormikControl
                        control="input"
                        label="DOB"
                        name="dob"
                        type="text"
                      />
                      {/* should be pre filled and disabled */}

                      <FormikControl
                        control="input"
                        label="Mobile Number"
                        name="mobile_no"
                        type="text"
                      />

                      <FormikControl
                        control="select"
                        label="Gender"
                        name="gender"
                        type="select"
                        options={genderOptions}
                      />
                    </VStack>

                    <VStack>
                      {/* should be pre filled and disabled */}
                      <FormikControl
                        control="input"
                        label="Registration Number"
                        name="registration_no"
                        type="text"
                      />

                      <FormikControl
                        control="input"
                        label="Guardian Mobile Number"
                        name="guardian_mobile_no"
                        type="text"
                      />

                      {/* should be pre filled and disabled */}

                      <FormikControl
                        control="input"
                        label="Category"
                        name="category"
                        type="text"
                      />

                      {/* should be pre filled and disabled */}

                      <FormikControl
                        control="input"
                        label="Nationality"
                        name="nationality"
                        type="text"
                      />

                      <FormikControl
                        control="select"
                        label="Marital Status"
                        name="marital_status"
                        type="select"
                        options={martialStatusOptions}
                      />
                      {/* should be pre filled and disabled */}

                      <FormikControl
                        control="input"
                        label="Email"
                        name="email"
                        type="email"
                      />

                      <FormikControl
                        control="input"
                        label="Aadhaar Number"
                        name="aadhaar_no"
                        type="text"
                      />
                    </VStack>
                  </HStack>
                  <HStack align="center" spacing={10}>
                    <VStack align="center" spacing={5}>
                      <Text
                        fontWeight="bold"
                        className="mt-3 bg-white p-1 rounded"
                      >
                        Correspondence address
                      </Text>
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
                        control="nestedselect"
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
                      <Text
                        fontWeight="bold"
                        className="mt-3 bg-white p-1 rounded"
                      >
                        Permanent address
                      </Text>
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
                        control="nestedselect"
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
                  <Button
                    onClick={onOpen}
                    type="button"
                    //need to uncomment this later
                    // isDisabled={!(formik.isValid && formik.dirty)}
                  >
                    Save and next
                  </Button>

                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Proceed to Next Stage
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            colorScheme="red"
                            onClick={() => handleFinalSubmit(formik.values)}
                          >
                            Submit
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Form>
              </VStack>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default PersonalDetails;
