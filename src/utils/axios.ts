import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
  },
})

customFetch.interceptors.request.use(
  async (config: any) => {
    const user = localStorage.getItem('token')

    if (user) {
      config.headers.common['Authorization'] = `Bearer ${user.replaceAll('"', '')}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default customFetch
