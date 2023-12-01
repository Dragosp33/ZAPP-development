import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import signupService from '../services/signup'

const SignupVerify = () => {
  const { verificationCode } = useParams()
  const [message, setMessage] = useState('Loading')

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await signupService.verify_account(verificationCode)
        console.log(response)
        setMessage('verified')
      } catch (error) {
        console.error('Verification failed:', error.response.data.error)
        setMessage('Not valid')
        // Handle failure, e.g., show an error message to the user
      }
    }

    verifyAccount()
  }, [verificationCode])

  console.log(message)
  if (message === 'Loading') {
    return <>Verifying your account...</>
  } else if (message === 'verified') {
    return (
      <>
        Your account has been successfully verified, you can now
        <Link to="/login" className="px-2">
          {' '}
          Login{' '}
        </Link>
      </>
    )
  } else {
    return (
      <>
        Verification Code is not valid. Please review your url in the email sent
        to you.
      </>
    )
  }
}

export default SignupVerify
