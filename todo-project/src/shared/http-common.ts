import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});