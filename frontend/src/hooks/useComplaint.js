import axios from '../api/axios';

const useComplaint = () => {
    const register = async (data) => {
        try {
            console.log(data);
            delete data.screenshot;

            const res = await axios.post(
                '/complaint/register',
                JSON.stringify(data)
            );

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    return { register };
};

export default useComplaint;
