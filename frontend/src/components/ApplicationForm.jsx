import { React, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "./FormikControl";
import * as Yup from "yup";
import { Button, Text, HStack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import
import { useToast } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
//for now I am storing in an array, need to store in localstorage or backend
const Apply = () => {
  const [appliedPrograms, setappliedPrograms] = useState([]);
  const [disableAddButton, setdisableAddButton] = useState(false);
  const initialValues = {
    department: "",
    programme: "",
    course: "mba",
  };
  const validationSchema = Yup.object({
    department: Yup.string().required("Required"),
    programme: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
  });
  const handleFinalSubmit = () => {
    //use the above declared state variables here
  };
  const departmentOptions = [
    { key: "Please select the Department", value: "" },
    {
      key: "Management Studies and Industrial Engineering",
      value: "management_and_industrial_engineering",
    },
  ];
  const programmeOptions = [
    {
      key: "Please select a programme",
      value: "",
    },
    {
      key: "Business Analytics",
      value: "business_analytics",
    },
    {
      key: "Master of Business Administration",
      value: "master_of_business_administration",
    },
  ];
  const courseOptions = [{ key: "MBA", value: "mba" }];
  const toast = useToast();
  useEffect(() => {
    if (appliedPrograms.length == 2) {
      setdisableAddButton(true);
    } else {
      setdisableAddButton(false);
    }
    return;
  }, [appliedPrograms]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formik) => {
        const handleClick = () => {
          if (
            formik.values.department === "" ||
            formik.values.programme === ""
          ) {
            toast({
              name: "Required Data",
              description: "Please fill all the required fields",
              status: "error",
              duration: 2000,
              position: "top-right",
              isClosable: true,
            });
            return;
          } else {
            //add to programs you wish to apply  for
            if (
              appliedPrograms.find(
                (p) => p.programme === formik.values.programme
              )
            ) {
              toast({
                name: "Duplicates are not allowed",
                description:
                  "You are allowed to select a  program only one time",
                status: "info",
                duration: 2000,
                position: "top-right",
                isClosable: true,
              });
            } else {
              setappliedPrograms((prevs) => [...prevs, formik.values]);
            }
            formik.resetForm();
            return;
          }
          return;
        };
        useEffect(() => {}, [appliedPrograms]);
        return (
          <>
            <Box>
              <Link to="/mba_admission/home">
                <Button>Back to Applicant Home</Button>
              </Link>
            </Box>
            <Form>
              <HStack>
                <FormikControl
                  control="select"
                  name="department"
                  label="Department"
                  options={departmentOptions}
                  type="select"
                />

                <FormikControl
                  control="select"
                  name="programme"
                  label="Programme"
                  options={programmeOptions}
                  type="select"
                />

                <FormikControl
                  control="select"
                  name="course"
                  label="Course"
                  options={courseOptions}
                  type="select"
                />
              </HStack>
              <Button
                onClick={handleClick}
                type="button"
                isDisabled={disableAddButton}
              >
                Add
              </Button>
            </Form>

            <Text>Programme you wish to apply for</Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Sr.No</Th>
                    <Th>Department</Th>
                    <Th>Programme Applying for</Th>
                    <Th>Course</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {appliedPrograms.map((applied, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>
                          {
                            departmentOptions.find(
                              (d) => d.value === applied.department
                            ).key
                          }
                        </Td>
                        <Td>
                          {
                            programmeOptions.find(
                              (p) => p.value === applied.programme
                            ).key
                          }
                        </Td>
                        <Td>MBA</Td>
                        <Td>
                          <Button
                            onClick={() =>
                              //may be this a lil bit complicated try to reduce complexity
                              setappliedPrograms((prev) =>
                                prev.filter((p, inx) => index != inx)
                              )
                            }
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Button onClick={handleFinalSubmit} type="button">
              Submit Final Programme Selection
            </Button>
            <Text color={"red"}>
              Disclaimer :Once you click on "Submit Final Programme Selection",
              You cannot change your selection later.
            </Text>
          </>
        );
      }}
    </Formik>
  );
};

export default Apply;
