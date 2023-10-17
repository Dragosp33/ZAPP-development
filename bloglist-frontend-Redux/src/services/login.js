import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const verifyToken = async () => {
  try {
    const response = await axios.post(`${baseUrl}/verify_token`)
    // console.log(response)
    return response.data
  } catch {
    console.log('??????')
    return null
  }
}

export default { login, verifyToken }
