const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  // console.log(list)
  if (!list || list.length < 1) {
    return 0
  }
  if (list.length === 1) {
    // console.log(list[0])
    return list[0].likes
  } else if (list.length > 1) {
    let sum = 0
    list.forEach((element) => {
      sum += element.likes
    })
    return sum
  }
}

const favouritePost = (list) => {
  if (!list || list.length < 1) {
    return null
  }
  if (list.length === 1) {
    return list[0]
  } else {
    let favourite = list[0]
    list.forEach((element) => {
      if (element.likes > favourite.likes) {
        favourite = element
      }
    })
    return favourite
  }
}

const mostBlogs = (list) => {
  if (!list || list.length < 1) {
    return null
  }
  if (list.length === 1) {
    return list[0].author
  } else {
    // return Object.keys(_.countBy(list, 'author'))
    const k = _.countBy(list, 'author')
    return Object.keys(k).reduce((a, b) => k[a] > k[b] ? a : b)
  }
}

const mostLikes = (list) => {
  if (!list || list.length < 1) {
    return null
  }
  if (list.length === 1) {
    return {
      author: list[0].author,
      likes: list[0].likes,
    }
  } else {
    const output =
  _(list)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes') }))
    .value()
    const max = _.maxBy(output, 'likes')
    return max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouritePost,
  mostBlogs,
  mostLikes,
}
