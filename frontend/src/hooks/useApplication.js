import axios from '../api/axios';
import useAuth from './useAuth';
import useTickets from './useTickets';

const useApplication = () => {
    const { auth, setAuth } = useAuth();
    const { submitTicket } = useTickets();

    const submit = async (data) => {
        try {
            const res = await axios.post(
                '/application/submit',
                JSON.stringify(data)
            );

            setAuth({ ...auth, steps: data.steps_reached });

            if (data.steps_reached === 4) {
                const to_submit = {
                    type: 'PG Application Submit',
                    description: auth.identity,
                };
                const res2 = await submitTicket(to_submit);
            }

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
