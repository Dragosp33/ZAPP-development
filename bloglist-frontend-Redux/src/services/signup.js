import axios from 'axios'
const baseUrl = '/api/signup'

const signup = async (body) => {
  const response = await axios.post(baseUrl, body)
  return response.data
}

export default { signup }
