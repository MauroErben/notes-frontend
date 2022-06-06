// NOTES APIS
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

const getAuthorization = () => {
  const token = localStorage.getItem('online-notes')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
}

export const createNote = payload => {
  return axiosInstance
    .post('/notes', payload, getAuthorization())
    .then(res => res)
    .catch(error => console.log(error))
}

export const getAllNotes = () => {
  return axiosInstance
    .get('/notes', getAuthorization())
    .then(res => res)
    .catch(error => console.log(error))
}

export const deleteNote = id => {
  return axiosInstance
    .delete(`/notes/${id}`, getAuthorization())
    .then(res => res)
    .catch(error => console.log(error))
}
