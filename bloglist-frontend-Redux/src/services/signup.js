import axios from 'axios'
const baseUrl = '/api/signup'

const signup = async (body) => {
  const response = await axios.post(baseUrl, body)
  return response.data
}

const verify_account = async (url) => {
  const response = await axios.get(`${baseUrl}/verify/${url}`)
  console.log('response???', response)
  return response.data
}

export default { signup, verify_account }
