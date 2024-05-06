import { React, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Text } from '@chakra-ui/react';
import FormikControl from './FormikControl';
import {
    FormControl,
    FormErrorMessage,
    Box,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react';
import useApplication from '../hooks/useApplication.js';

const WorkExperience = ({ moveToNext }) => {
    const { submit } = useApplication();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const initialValues = {
        has_workexperience: '',
        work_experience: [
            {
                designation: '',
                organization: '',
                nature_of_work: '',
                duration: 0,
                sector: '',
            },
        ],
        total_workexperience: 0,
    };
    const validationSchema = Yup.object({
        has_workexperience: Yup.string().required('Required'),
        work_experience: Yup.array().when('has_workexperience', {
            is: 'true',
            then: () =>
                Yup.array().of(
                    Yup.object({
                        designation: Yup.string()
                            .max(50, 'Exceeds 50 characters')
                            .required('Required'),
                        organization: Yup.string()
                            .max(200, 'Exceeds 200 characters')
                            .required('Required'),
                        nature_of_work: Yup.string()
                            .max(200, 'Exceeds 200 characters')
                            .required('Required'),
                        duration: Yup.number()
                            // we need to use typeError here
                            .typeError('Duration must be a valid number')
                            .integer('Duration must be an integer')
                            .required('Required'),
                        sector: Yup.string()
                            .max(50, 'Exceeds 50 characters')
                            .required('Required'),
                    })
                ),
        }),
        total_workexperience: Yup.number()
            // we need to use typeError here
            .typeError('Duration must be a valid number')
            .integer('Duration must be an integer')
            .required('Required'),
    });

    const handleFinalSubmit = async (values) => {
        // on the final onsubmit handler we need to
        //check if the has_workexperience is fasle /true
        // if false make the work experience array empty
        // I added one initial Object just because of error validation

        values.steps_reached = 3;
        try {
            console.log(values);
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
    const hasWorkExperienceOptions = [
        { key: 'Please select', value: '' },
        { key: 'Yes', value: true },
        { key: 'No', value: false },
    ];
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {(formik) => {
                return (
                    <Form>
                        <Text>Work Experience</Text>

                        <FormikControl
                            control="select"
                            name="has_workexperience"
                            options={hasWorkExperienceOptions}
                            label="Do you have any Work Experience?"
                        />
                        {formik.values.has_workexperience === 'true' && (
                            <>
                                <Field name="work_experience">
                                    {({ field, form }) => {
                                        return (
                                            <FormControl
                                                isInvalid={
                                                    form.errors[
                                                        'work_experience'
                                                    ] &&
                                                    form.touched[
                                                        'work_experience'
                                                    ]
                                                }
                                            >
                                                {formik.values.work_experience
                                                    .length > 0 && (
                                                    <>
                                                        <Text>
                                                            Details of Work
                                                            Experience
                                                        </Text>
                                                    </>
                                                )}
                                                <FieldArray name="work_experience">
                                                    {(fieldArrayprops) => {
                                                        const {
                                                            push,
                                                            form,
                                                            pop,
                                                            remove,
                                                        } = fieldArrayprops;
                                                        const { values } = form;

                                                        const {
                                                            work_experience,
                                                        } = values;
                                                        return (
                                                            <div>
                                                                {work_experience.map(
                                                                    (
                                                                        educationObject,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <Box
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <FormikControl
                                                                                    control="input"
                                                                                    name={`work_experience.${index}.designation`}
                                                                                    label="Designation (less than 50 characters)"
                                                                                    isRequired={
                                                                                        true
                                                                                    }
                                                                                />
                                                                                {formik.errors &&
                                                                                formik
                                                                                    .errors
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.designation &&
                                                                                formik.touched &&
                                                                                formik
                                                                                    .touched
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .touched
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.designation ? (
                                                                                    <FormErrorMessage>
                                                                                        {
                                                                                            formik
                                                                                                .errors
                                                                                                ?.work_experience[
                                                                                                index
                                                                                            ]
                                                                                                ?.designation
                                                                                        }
                                                                                    </FormErrorMessage>
                                                                                ) : null}

                                                                                {/* organization starts */}

                                                                                <FormikControl
                                                                                    control="input"
                                                                                    name={`work_experience.${index}.organization`}
                                                                                    label="Organization (less than 200 characters)"
                                                                                    isRequired={
                                                                                        true
                                                                                    }
                                                                                />
                                                                                {formik.errors &&
                                                                                formik
                                                                                    .errors
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.organization &&
                                                                                formik.touched &&
                                                                                formik
                                                                                    .touched
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .touched
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.organization ? (
                                                                                    <FormErrorMessage>
                                                                                        {
                                                                                            formik
                                                                                                .errors
                                                                                                ?.work_experience[
                                                                                                index
                                                                                            ]
                                                                                                ?.organization
                                                                                        }
                                                                                    </FormErrorMessage>
                                                                                ) : null}

                                                                                {/* nature of work starts */}

                                                                                <FormikControl
                                                                                    control="input"
                                                                                    name={`work_experience.${index}.nature_of_work`}
                                                                                    label="Nature of Work (less than 200 characters including space)"
                                                                                    isRequired={
                                                                                        true
                                                                                    }
                                                                                />
                                                                                {formik.errors &&
                                                                                formik
                                                                                    .errors
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.nature_of_work &&
                                                                                formik.touched &&
                                                                                formik
                                                                                    .touched
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .touched
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.nature_of_work ? (
                                                                                    <FormErrorMessage>
                                                                                        {
                                                                                            formik
                                                                                                .errors
                                                                                                ?.work_experience[
                                                                                                index
                                                                                            ]
                                                                                                ?.nature_of_work
                                                                                        }
                                                                                    </FormErrorMessage>
                                                                                ) : null}

                                                                                <FormikControl
                                                                                    control="input"
                                                                                    name={`work_experience.${index}.duration`}
                                                                                    label="Duration (in months)"
                                                                                    isRequired={
                                                                                        true
                                                                                    }
                                                                                />
                                                                                {formik.errors &&
                                                                                formik
                                                                                    .errors
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.duration &&
                                                                                formik.touched &&
                                                                                formik
                                                                                    .touched
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .touched
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.duration ? (
                                                                                    <FormErrorMessage>
                                                                                        {
                                                                                            formik
                                                                                                .errors
                                                                                                ?.work_experience[
                                                                                                index
                                                                                            ]
                                                                                                ?.duration
                                                                                        }
                                                                                    </FormErrorMessage>
                                                                                ) : null}

                                                                                <FormikControl
                                                                                    control="input"
                                                                                    name={`work_experience.${index}.sector`}
                                                                                    label="Sector (less than 50 characters)"
                                                                                    isRequired={
                                                                                        true
                                                                                    }
                                                                                />
                                                                                {formik.errors &&
                                                                                formik
                                                                                    .errors
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.sector &&
                                                                                formik.touched &&
                                                                                formik
                                                                                    .touched
                                                                                    .work_experience &&
                                                                                formik
                                                                                    .touched
                                                                                    ?.work_experience[
                                                                                    index
                                                                                ]
                                                                                    ?.sector ? (
                                                                                    <FormErrorMessage>
                                                                                        {
                                                                                            formik
                                                                                                .errors
                                                                                                ?.work_experience[
                                                                                                index
                                                                                            ]
                                                                                                ?.sector
                                                                                        }
                                                                                    </FormErrorMessage>
                                                                                ) : null}

                                                                                {formik
                                                                                    .values
                                                                                    .work_experience
                                                                                    .length >
                                                                                    1 && (
                                                                                    <Button
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            remove(
                                                                                                index
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Remove
                                                                                    </Button>
                                                                                )}
                                                                            </Box>
                                                                        );
                                                                    }
                                                                )}

                                                                <Button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        push({
                                                                            designation:
                                                                                '',
                                                                            organization:
                                                                                '',
                                                                            nature_of_work:
                                                                                '',
                                                                            duration: 0,
                                                                            sector: '',
                                                                        })
                                                                    }
                                                                >
                                                                    Add Work
                                                                    Experience
                                                                    Education
                                                                    details
                                                                </Button>
                                                            </div>
                                                        );
                                                    }}
                                                </FieldArray>
                                            </FormControl>
                                        );
                                    }}
                                </Field>

                                <FormikControl
                                    control="input"
                                    label="Total Work Experience (in months)"
                                    name="total_workexperience"
                                />
                            </>
                        )}

                        <Button
                            onClick={onOpen}
                            type="button"
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
                                    <AlertDialogHeader
                                        fontSize="lg"
                                        fontWeight="bold"
                                    >
                                        Proceed to Next Stage
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can't undo this action
                                        afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button
                                            ref={cancelRef}
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            colorScheme="red"
                                            onClick={() =>
                                                handleFinalSubmit(formik.values)
                                            }
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

export default WorkExperience;
