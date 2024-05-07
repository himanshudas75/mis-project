import axios from '../api/axios';

const useTickets = () => {
    const url = import.meta.env.VITE_TICKET_URL;
    const submitTicket = async (data) => {
        try {
            console.log('SUBMIT TICKET', data);
            const res = await axios.post(url, JSON.stringify(data));
            return res.data;
        } catch (err) {
            console.log(err);
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    return { submitTicket };
};

export default useTickets;
