import axios from '../api/axios';

const useApplication = () => {
    const submit = async (data) => {
        try {
            const res = await axios.post(
                '/application/submit',
                JSON.stringify(data)
            );

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
