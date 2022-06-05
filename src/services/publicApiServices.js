// LOGIN AND REGISTER
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2000
})

export const registerUser = payload => {
  return axiosInstance
    .post('auth/register', payload)
    .then(res => res)
    .catch(error => console.log(error))
}

export const loginUser = payload => {
  return axiosInstance
    .post('auth/login', payload)
    .then(res => res)
    .catch(error => console.log(error))
}
