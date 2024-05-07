import axios from '../api/axios';
import useAuth from './useAuth';

const useApplication = () => {
    const { auth, setAuth } = useAuth();

    const submit = async (data) => {
        try {
            const res = await axios.post(
                '/application/submit',
                JSON.stringify(data)
            );

            setAuth({ ...auth, steps: data.steps_reached });
            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    const getSteps = async () => {
        try {
            const res = await axios.get('/application/getSteps');
            // console.log('ABCD', res.data);
            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    return { submit, getSteps };
};

export default useApplication;
