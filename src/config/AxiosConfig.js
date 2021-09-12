// /**
//  * Axios config  setup
//  * Set interceptor for global api response error handling
//  * Set access token in headers
//  */
import axios from "axios";
//import store from "../Redux/store"
//import { LOGOUT } from "../Redux/login/Types"

(function (axios) {

    axios.interceptors.request.use(function (req) {
        if (req.url.includes('api')) {
            let user = JSON.parse(localStorage.getItem('notzzUser'))
            console.log("users",user.token)
            req.headers.token = user.token
        }
        return req
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axios.interceptors.response.use(null, (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('login')
                return Promise.reject(error);
            } else return Promise.reject(error);
        } else if (error.request) {
            let err = {
                response: {
                    data: {
                        message: "Something went wrong,Please try again later!!!"
                    }
                }
            }
            return Promise.reject(err);
        }
    });
})(axios);