import axios from '../api/axios';
import useAuth from './useAuth';
import useApplication from './useApplication';

const useUser = () => {
    const { setAuth } = useAuth();
    const { getSteps } = useApplication();

    const register = async (data) => {
        try {
            const res = await axios.post('/register', JSON.stringify(data));
            const res2 = await getSteps();

            const identity = res.data.user.identity;
            const roles = res.data.user.roles;
            const steps = res2.steps;

            setAuth((prev) => ({
                identity,
                roles,
                steps,
            }));

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    const login = async (data) => {
        try {
            const res = await axios.post('/login', JSON.stringify(data));
            const res2 = await getSteps();

            const identity = res.data.user.identity;
            const roles = res.data.user.roles;
            const steps = res2.steps;

            setAuth((prev) => ({
                identity,
                roles,
                steps,
            }));

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    const getDetails = async () => {
        try {
            const res = await axios.get('/getDetails');
            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get('/logout', {
                withCredentials: true,
            });
            setAuth({});
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    return { login, logout, register, getDetails };
};

export default useUser;
