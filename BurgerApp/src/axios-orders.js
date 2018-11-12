import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-51a8e.firebaseio.com'
});

export default instance;