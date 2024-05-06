import React, { useRef } from "react";
import { Text, Button, VStack, useDisclosure } from "@chakra-ui/react";
import FormikControl from "./components/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
const validFileExtensions = { image: ["jpg", "jpeg", "png"], pdf: ["pdf"] };
function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}
const DocumentUpload = ({ moveToNext }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const declarationOptions = [
    {
      key: `I hereby declare that I have read and understood the conditions of eligibilty for 2 Years MBA / MBA in Business Analytics admission ${new Date().getFullYear()}.I fulfill the minimum eligibility criteria and I have provided the necessary information in this regard. In the event of the information being found incorrect or misleading, my candidature shall be liable to cancellation at any time. Further, I have carefully read all the instructions and I accept them and shall not raise any dispute in future over the same.
I ,hereby, give my consent to make some or all my data in IITISM website and various other portals of IITISM as and when required by IIT(ISM)`,
    },
  ];
  const initialValues = {
    dob: undefined,
    tenth_marksheet: undefined,
    twelfth_marksheet: undefined,
    cat_scorecard: undefined,
    ug_marksheet: undefined,
    work_experience: undefined,
    photo: undefined,
    signature: undefined,
    declaration: "",
  };
  const validationSchema = Yup.object({
    dob: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 1MB",
        (value) => value && value.size <= 1024000
      ),
    tenth_marksheet: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 1MB",
        (value) => value && value.size <= 1024000
      ),
    twelfth_marksheet: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 1MB",
        (value) => value && value.size <= 1024000
      ),
    cat_scorecard: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 1MB",
        (value) => value && value.size <= 1024000
      ),
    ug_marksheet: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 1MB",
        (value) => value && value.size <= 1024000
      ),
    work_experience: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 1MB",
        (value) => value && value.size <= 1024000
      ),
    photo: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 50KB",
        (value) => value && value.size <= 102400
      ),
    signature: Yup.mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "MAX Allowed size is 50KB",
        (value) => value && value.size <= 102400
      ),
    declaration: Yup.string().required("Required"),
  });
  const handleFinalSubmit = (values) => {
    console.log(values);
    moveToNext();
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(formik) => {
        return (
          <Form>
            <Text>Document Upload</Text>

            <VStack>
              <FormikControl
                control="filefield"
                label="DOB/X Marksheet"
                name="dob"
                accept="application/pdf"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>

              <FormikControl
                control="filefield"
                label="10th Marksheet"
                name="tenth_marksheet"
                accept="application/pdf"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>
              <FormikControl
                control="filefield"
                label="12th Marksheet"
                name="twelfth_marksheet"
                accept="application/pdf"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>
              <FormikControl
                control="filefield"
                label="CAT Score Card"
                name="cat_scorecard"
                accept="application/pdf"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>
              <FormikControl
                control="filefield"
                label="UG Marksheet"
                name="ug_marksheet"
                accept="application/pdf"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>
              <FormikControl
                control="filefield"
                label="Work Experience (Combine all the work experiences and upload a single file"
                name="work_experience"
                accept="application/pdf"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>
              <FormikControl
                control="filefield"
                label="Photo"
                name="photo"
                accept="image/png,image/jpg,image/jpeg"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>

              <FormikControl
                control="filefield"
                label="Signature"
                name="signature"
                accept="image/png,image/jpg,image/jpeg"
              />
              <Button>Upload</Button>
              <Button>Preview</Button>
              <FormikControl
                control="checkbox"
                name="declaration"
                label="Declaration"
                options={declarationOptions}
              />
            </VStack>
            <Button
              type="button"
              onClick={onOpen}
              // need to uncomment this later
              // isDisabled={!(formik.isValid && formik.dirty)}
            >
              Save and Next
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
        );
      }}
    </Formik>
  );
};

export default DocumentUpload;
