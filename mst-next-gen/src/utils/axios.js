import axios from 'axios';
import eventBus from './eventBus';

axios.defaults.baseURL = "http://127.0.0.1:3001"
axios.defaults.withCredentials = true;
// request
axios.interceptors.request.use((config) => {
    return config;
},
    (error) => {
        eventBus.emit("toast",{message:error.errMsg||error.message,type:"error"})
        return Promise.reject(error)
    }
);

// response
axios.interceptors.response.use(
    (res) => {
        const {data} = res;
        if(data?.errMsg){
            return Promise.reject(data)
        }
        return data
    },
    (error) => {
        eventBus.emit("toast",{message:error.errMsg||error.message,type:"error"})
        return Promise.reject(error)
    }
);

export default axios