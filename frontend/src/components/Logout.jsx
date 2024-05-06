import React from 'react';
import { Button } from '@chakra-ui/react';
import useUser from '../hooks/useUser.js';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
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
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default Logout;
