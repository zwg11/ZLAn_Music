import axios from 'axios'

export default function request(config) {
  const install = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  });
  install.interceptors.request.use(data=>{
    return data;
  }, err=>{
    return Promise.reject(err);
  });
  install.interceptors.response.use(res=>{
    return res.data;
  }, err=>{
    return Promise.reject(err);
  });
  return install(config)
}