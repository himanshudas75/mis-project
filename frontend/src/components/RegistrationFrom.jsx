import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import { Button, HStack, VStack } from '@chakra-ui/react';
import useUser from '../hooks/useUser.js';
// import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const RegistrationFrom = () => {
    // const { enqueueSnackbar } = useSnackbar();
    const { register } = useUser();
    const navigate = useNavigate();

    const categoryOptions = [
        { key: 'Please Select Your Category', value: '' },
        { key: 'General', value: 'General' },
        { key: 'OBC(NCL)', value: 'OBC(NCL)' },
        { key: 'EWS', value: 'EWS' },
        { key: 'SC', value: 'SC' },
        { key: 'ST', value: 'ST' },
    ];
    const divyangOptions = [
        { key: 'Please Select Divyang', value: '' },
        { key: 'Yes', value: true },
        { key: 'No', value: false },
    ];
    const btechRadioOptions = [
        { key: 'Yes', value: 'true' },
        { key: 'No', value: 'false' },
    ];
    const initialValues = {
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        category: '',
        mobilenumber: '',
        divyang: '',
        dob: '',
        btechdegree: '',
        mathorstatdegree: 'true',
    };
    const validationSchema = Yup.object({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        middlename: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        category: Yup.string().required('Required'),
        mobilenumber: Yup.string()
            .length(10, 'Phone number need to be 10 numbers')
            .required('Required'),
        divyang: Yup.boolean().required('Required'),
        dob: Yup.date().required('Required'),
        btechdegree: Yup.boolean().required('Required'),
        mathorstatdegree: Yup.string().when('btechdegree', {
            is: 'false',
            then: Yup.string().required('Required'),
        }),
    });
    const onSubmit = async (values) => {
        try {
            console.log(values);
            const res = await register(values);
            if (res) {
                if (res.success) {
                    // enqueueSnackbar('User registered successfully!', {
                    //     variant: 'success',
                    // });
                    navigate('/', { replace: true });
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
                                    type="select"
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
                                    type="radio"
                                />
                                {formik.values.btechdegree === 'false' && (
                                    <FormikControl
                                        control="radio"
                                        label="Do you have a Bachelor's degree with mathematics or statistics as subject?"
                                        name="mathorstatdegree"
                                        options={btechRadioOptions}
                                        type="radio"
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
                                    type="text"
                                />
                                <FormikControl
                                    control="select"
                                    label="Category"
                                    name="category"
                                    options={categoryOptions}
                                    type="text"
                                />

                                <FormikControl
                                    control="input"
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                />
                            </VStack>
                        </HStack>
                        <Button
                            type="submit"
                            isDisabled={!(formik.isValid && formik.dirty)}
                        >
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RegistrationFrom;
