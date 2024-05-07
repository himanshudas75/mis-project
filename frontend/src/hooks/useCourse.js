import axios from '../api/axios';

const useCourse = () => {
    const add = async (data) => {
        try {
            const res = await axios.post('/course/add', JSON.stringify(data));

            return res.data;
        } catch (err) {
            console.log(err?.response?.data);
            return err?.response?.data;
        }
    };

    return { add };
};

export default useCourse;
