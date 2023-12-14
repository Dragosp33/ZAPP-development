const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const Comments = require('../models/comments')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const userExtractor = middleware.requireAuth
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { fromEnv } = require('@aws-sdk/credential-providers')

// Set up AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Read from environment variable
  credentials: fromEnv(), // Load AWS access keys from environment variables
  endpoint: 'https://s3.eu-west-3.amazonaws.com',
})

console.log(process.env.AWS_REGION)

// Configure multer
const storage = multer.memoryStorage()
console.log(storage)
const upload = multer({ storage: storage })

// Define the route for handling file uploads
blogsRouter.post(
  '/test',
  userExtractor,
  upload.array('images', 5),
  async (req, res) => {
    try {
      // Iterate through the uploaded files and upload them to S3
      const uploadedImages = []
      for (const file of req.files) {
        const randomString = uuidv4()
        const key = randomString + Date.now() + path.extname(file.originalname)
        const params = {
          Bucket: 'heroevent',
          Key: key,
          Body: file.buffer,
        }

        const command = new PutObjectCommand(params)
        await s3Client.send(command)

        // Store the S3 object URL in your database or return it to the client
        // 015e31933548461020e2ba448e85995e
        const s3ObjectUrl = `https://heroevent.s3.eu-west-3.amazonaws.com/${key}`
        uploadedImages.push(s3ObjectUrl)
      }

      const saveDescription = req.body.description
      const user = req.user

      // Handle your response here
      // res.json({ images: uploadedImages })
      console.log(uploadedImages)
      const toSaveBlog = new Blog({
        description: saveDescription,
        likes: 0,
        images: uploadedImages,
        user: user._id,
      })
      console.log(toSaveBlog)
      const savedBlog = await toSaveBlog.save()
      console.log(savedBlog)
      // save blog to user
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      const parsedResponse = await savedBlog.populate('user', {
        username: 1,
        name: 1,
        profilePicUrl: 1,
      })

      res.status(201).json(parsedResponse)
    } catch (error) {
      console.error('Error uploading photos: ', error)
      res.status(500).json({ message: 'Error uploading photos' })
    }
    // Do something with the uploaded files, e.g., store them in Amazon S3
  }
)

blogsRouter.get('/', async (request, response) => {
  const Blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    profilePicUrl: 1,
  })
  // console.log(Blogs)
  response.json(Blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  console.log(request.token)

  const user = request.user
  console.log('User in controllers.blogs: ', user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })
  console.log('blog in controllers blog:', blog)
  const blogObject = blog.toObject()

  if (
    !Object.hasOwn(blogObject, 'title') ||
    !Object.hasOwn(blogObject, 'url') ||
    blogObject.title === '' ||
    blogObject.url === ''
  ) {
    response.status(400).send({ message: 'Blog should have a title and url' })
  } else {
    if (!Object.hasOwn(blogObject, 'likes')) {
      // console.log('blogul nu are likes', blog)
      blog.likes = 0
    }

    console.log('Blog la final dupa toate ifurile: ', blog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const k2 = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(k2)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log('???', blog)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json({ message: 'blog was not found' }).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const reqUser = request.user
  // console.log(`user in request: ${reqUser}`)
  const user = await User.findById(reqUser)
  // console.log(`user.findbyid: ${user._id}`)
  const blog = await Blog.findById(request.params.id)
  // console.log(`blog.user.tostring: ${blog.user.toString()}`)
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs.filter((n) => n.id !== request.params.id)
    response.status(204).end()
  } else {
    response.status(403).send({
      message: '403: Forbidden',
    })
  }
})

blogsRouter.put('/:id/like', userExtractor, async (request, response) => {
  const user = request.user
  const id = request.params.id
  console.log(user, id)
  const oldBody = await Blog.findById(id)
  if (oldBody === null) {
    response.status(404).send({
      message: 'cant find the blog',
    })
  } else if (user) {
    const blog = {
      title: oldBody.title,
      author: oldBody.author,
      url: oldBody.url,
      likes: oldBody.likes,
      user: oldBody.user,
      likedBy: oldBody.likedBy,
    }
    console.log('OLD BLOG BODY: ', oldBody)
    console.log('USER????', user)
    if (blog.likedBy.includes(user._id)) {
      console.log('liked already')

      blog.likedBy = blog.likedBy.filter(
        (id) => id.toString() !== user._id.toString()
      )
      blog.likes = blog.likes - 1
      // console.log('liked in if: ', k)
    } else {
      blog.likes = blog.likes + 1
      blog.likedBy.push(user._id)
    }
    // = oldBody.likedBy.push(user._id)
    // const newBody = {...}
    console.log(blog)
    const responseBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    const k2 = await responseBlog.populate('user', {
      username: 1,
      name: 1,
      profilePicUrl: 1,
    })
    console.log(k2)
    response.status(202).json(k2)
  } else {
    response.status(403).send({
      message: '403: Forbidden',
    })
  }
})

blogsRouter.get('/:id/comments', userExtractor, async (request, response) => {
  console.log('???')
  const user = request.user
  console.log('user: ', user)
  const id = request.params.id
  if (user) {
    const comments = await Comments.find({ blog: id })
    return response.status(200).json(comments)
  }
  return response.status(403).send({
    message: '403: Forbidden',
  })
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  console.log('????????')
  const user = request.user
  const id = request.params.id
  const body = request.body
  console.log(body)
  const blog = await Blog.findById(id)
  if (user) {
    const postBody = new Comments({
      content: body.content,
      blog: blog.id,
    })
    const savedComment = await postBody.save()
    const comments = await Comments.find({ blog: id })
    return response.status(200).json(comments)
    // return response.status(200).json(savedComment)
  }
  return response.status(403).send({
    message: '403: Forbidden',
  })
})

module.exports = blogsRouter
