import { Formik, Form } from 'formik';
import React from 'react';
import FormikControl from './FormikControl';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
const ChangePassword = () => {
    const { changePassword } = useUser();
    const navigate = useNavigate();

    const initialValues = {
        password: '',
    };
    const onSubmit = async (values) => {
        try {
            const res = await changePassword(values);
            // console.log(values);
            if (res) {
                if (res.success) {
                    // enqueueSnackbar('User registered successfully!', {
                    //     variant: 'success',
                    // });
                    navigate('/login', { replace: true });
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
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form>
                            <FormikControl
                                control="input"
                                name="password"
                                label="Enter New password"
                                isRequired={true}
                            />
                            <Button type="submit">Change Password</Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ChangePassword;
