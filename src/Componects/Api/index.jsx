import axios from 'axios';

export const fetchData = () => {
    return axios.get('http://student.crru.ac.th/641463021/cit5603/Cars/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};