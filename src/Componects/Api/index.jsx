import axios from 'axios';

export const fetchData = () => {
    return axios.get('http://localhost:8081/Cars/')
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            return [];
        });
};