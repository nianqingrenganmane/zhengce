import axios from 'axios';
import router from "./router";
// 请求拦截  设置统一header
axios.interceptors.request.use(
    config => {
        if (localStorage.ele_login)
            config.headers.token = localStorage.ele_login;
        return config;
    }
);

// 响应拦截  401 token过期处理
axios.interceptors.response.use(
    response => {
        console.log(response)
        if (response.data.code == 10103 || response.data.code == 10101) {
            localStorage.removeItem('ele_login')
            router.replace({
                path: '/author'
            })
        }
        return response;
    }
);
export default axios;