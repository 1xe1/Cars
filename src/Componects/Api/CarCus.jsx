import axios from 'axios';

export const loginUser = () => {
    return axios.get('http://student.crru.ac.th/641463021/cit5603/CarCus/')
        .then(response => {
            const userData = response.data.map(item => ({
                email: item.email,
                phone: item.phone
            }));
            return userData;

        })
        .catch(error => {
            console.log(error);
            return [];
        });
        
};
export default loginUser;