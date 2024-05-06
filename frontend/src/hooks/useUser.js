import axios from '../api/axios';

const useUser = () => {
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

    const getDetails = async () => {
        try {
            const res = await axios.get('/getDetails');
            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };
    return { register, getDetails };
};

export default useUser;
