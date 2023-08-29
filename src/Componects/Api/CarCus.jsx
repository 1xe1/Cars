import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/CarCus';

export const loginUser = async (email, phone) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/?email=${email}&phone=${phone}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
