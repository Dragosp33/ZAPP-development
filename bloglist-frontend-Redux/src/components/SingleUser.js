import ShowBlogs from './ShowBlogs'

const SingleUser = ({ userPage }) => {
  if (!userPage) {
    return null
  }

  return (
    <>
      <ShowBlogs user={userPage} />
    </>
  )
}

export default SingleUser
