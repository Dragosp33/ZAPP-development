import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  console.log('raspuns in getOne', response.data)
  return response.data
}

const updateOne = async (id, body) => {
  const response = await axios.put(`${baseUrl}/${id}/edit`, body)
  console.log('raspuns in updateOne', response.data)
  return response.data
}

export default { getAll, getOne, updateOne }
