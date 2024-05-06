import { createContext, useState, useEffect } from 'react';
import useApplication from '../hooks/useApplication';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const cookie_name = import.meta.env.VITE_AUTHENTICATION_COOKIE_NAME;
    const { getSteps } = useApplication();

    useEffect(() => {
        // Function to read cookie
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        // Read authentication cookie
        const authenticationCookie = getCookie(cookie_name);
        // console.log(authenticationCookie);
        var payload = {};

        if (authenticationCookie) {
            try {
                payload = JSON.parse(atob(authenticationCookie.split('.')[1])); // Decode base64 and parse JSON
            } catch (error) {
                console.error(
                    'Error decoding or parsing authentication cookie:',
                    error
                );
                return;
            }
        } else return;

        async function getStepsReached() {
            try {
                const res = await getSteps();
                if (res.success) {
                    if (payload) {
                        // console.log(payload);
                        setAuth((prev) => ({
                            ...prev,
                            identity: payload.identity,
                            roles: payload.roles,
                            steps: res.steps,
                        }));
                    }
                    // setAuth((prev) => ({
                    //     ...prev,
                    //     steps: res.steps,
                    // }));
                }
            } catch (err) {
                console.log('HEREERROR');
                console.error(err);
            }
            console.log('AUTH IS', auth);
        }

        getStepsReached();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
