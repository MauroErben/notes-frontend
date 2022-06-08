// LOGIN AND REGISTER
import axios from 'axios'
import { showErrorAlert } from '../utils/alerts'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 4000
})

export const registerUser = payload => {
  return axiosInstance
    .post('auth/register', payload)
    .then(res => res)
    .catch(error => showErrorAlert(error.response?.data?.message || 'Ocurrio un error inesperado'))
}

export const loginUser = payload => {
  return axiosInstance
    .post('auth/login', payload)
    .then(res => res)
    .catch(error => showErrorAlert(error.response?.data?.message || 'Ocurrio un error inesperado'))
}
