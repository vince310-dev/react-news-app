import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('userLoginData'))?.token}`;

export const setAxiosToken = (token) => {
  console.log(token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;