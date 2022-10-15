import axios from "axios";
import axiosRetry from 'axios-retry';


axiosRetry(axios, { retries: 3 });

// import dotenv from 'dotenv'
// dotenv.config()
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

instance.authorized = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance;
} 
  
export default instance;