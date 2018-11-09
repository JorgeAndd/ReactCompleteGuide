import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Authorization': 'AUTH TOKEN FROM INSTANCE'
    }
});

export default instance;