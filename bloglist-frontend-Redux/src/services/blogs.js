import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log('error')
    return []
  }
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('raspuns in delete request: ', response.data)
  return response.data
}

const likeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}/like`, null, config)
  console.log('raspuns in put request: ', response.data)
  return response.data
}

const getComments = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('token in getComments: ', token)
  const response = await axios.get(`${baseUrl}/${id}/comments`, config)
  console.log('raspuns in get request: ', response.data)
  return response.data
}

const postComment = async (id, object) => {
  console.log('object: ', object)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, object, config)
  console.log('raspuns in get request: ', response.data)
  return response.data
}

const getSingleBlog = async (id) => {
  console.log('id here: ', id)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  likeBlog,
  deleteBlog,
  getComments,
  postComment,
  getSingleBlog,
}
