import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useApplication from '../hooks/useApplication';

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    // const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const { getSteps } = useApplication();
    let isMounted = true;

    // const [persist] = useLocalStorage('persist', false);
    const cookie_name = import.meta.env.VITE_AUTHENTICATION_COOKIE_NAME;
    const checkCookieExists = (name) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        async function setAuthentication() {
            // console.log('Calling setAuth with ', isMounted);
            var authenticationCookie = '';
            var payload = '';

            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${cookie_name}=`);
            if (parts.length === 2)
                authenticationCookie = parts.pop().split(';').shift();

            if (authenticationCookie) {
                try {
                    payload = JSON.parse(
                        atob(authenticationCookie.split('.')[1])
                    );

                    // console.log('Before await I have', isMounted);
                    const res = await getSteps();
                    // console.log('After await I have', isMounted);

                    if (res.success) {
                        if (payload) {
                            // console.log(
                            //     'MY DATA',
                            //     payload.identity,
                            //     payload.roles,
                            //     res.steps
                            // );
                            setAuth((prev) => ({
                                ...prev,
                                identity: payload.identity,
                                roles: payload.roles,
                                steps: res.steps,
                            }));
                        }
                    }
                } catch (error) {
                    console.error(
                        'Error decoding or parsing authentication cookie:',
                        error
                    );
                    return;
                } finally {
                    // console.log('HERE', isMounted);
                    isMounted && setIsLoading(false);
                }
            } else return;
        }

        // let isMounted = true;

        // const verifyRefreshToken = async () => {
        //     try {
        //         await refresh();
        //     } catch (err) {
        //         console.error(err);
        //     } finally {
        //         isMounted && setIsLoading(false);
        //     }
        // };

        // console.log('isMounted here', isMounted);

        !auth?.identity && checkCookieExists(cookie_name)
            ? setAuthentication()
            : setIsLoading(false);

        // console.log('ISLOADING', isLoading);
        // !auth?.accessToken && persist
        //     ? verifyRefreshToken()
        //     : setIsLoading(false);

        // return () => (isMounted = false);
    }, []);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
    // if (!persist) {
    //     return <Outlet />;
    // } else {
    //     return <>{isLoading ? <Loading /> : <Outlet />}</>;
    // }
}

export default PersistLogin;
