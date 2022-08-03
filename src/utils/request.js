import '@/bootstrap';
import { Message, MessageBox } from 'element-ui';
import { isLogged, setLogged, setToken } from '@/utils/auth';
import Cookies from "js-cookie";
import store from "@/store";

// Create axios instance
const service = window.axios.create({
  baseURL: ' https://realafricalifeword.org/GIAC-APPLICATION/public/api/',
  // baseURL: 'http://localhost/GIAC-APPLICATION/public/api',
  // timeout: 10000000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  config => {
    const token = Cookies.get('token_key');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // Set JWT token
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  response => {
    // if (response.headers.authorization) {
    //   setLogged(response.headers.authorization);
    //   response.data.token = response.headers.authorization;
    // }
    // const res = response.data;
    // console.log('RESPONSE  CODE', response, response.data)
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   // to re-login
    //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //     confirmButtonText: 'Re-Login',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('user/resetToken').then(() => {
    //       location.reload()
    //     })
    //   })
    // }

    return response.data;
  },
  error => {
    // if (error.response.data.message === 'Unauthenticated') {
    //   // to re-login
    //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //     confirmButtonText: 'Re-Login',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning',
    //   }).then(() => {
    //     store.dispatch('user/resetToken').then(() => {
    //       location.reload();
    //     });
    //   });
    // }
    console.log(error);
    console.log(error.response.data.message);
    let message = error.message;
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
