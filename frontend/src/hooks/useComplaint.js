import axios from '../api/axios';
import useTickets from './useTickets';

const useComplaint = () => {
    const { submitTicket } = useTickets();

    const register = async (data) => {
        try {
            console.log(data);
            delete data.screenshot;

            const res = await axios.post(
                '/complaint/register',
                JSON.stringify(data)
            );

            const to_submit = {
                type: 'PG Complaint',
                description: data.order_no,
            };
            const res2 = await submitTicket(to_submit);

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    const track = async (data) => {
        try {
            console.log(data);
            delete data.screenshot;

            const res = await axios.post(
                '/complaint/track',
                JSON.stringify(data)
            );

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    return { register, track };
};

export default useComplaint;
