import axios from '../api/axios';
import useAuth from './useAuth';

const useUser = () => {
    const { setAuth } = useAuth();

    const register = async (data) => {
        try {
            console.log(data);
            const res = await axios.post('/register', JSON.stringify(data));

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    const login = async (data) => {
        try {
            console.log(data);
            const res = await axios.post('/login', JSON.stringify(data));

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
