import axios from 'axios'

export function useAxios() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  axios.defaults.baseURL = backendUrl
  axios.defaults.withCredentials = true
  axios.defaults.timeout = 10000

  return { axios }
}
