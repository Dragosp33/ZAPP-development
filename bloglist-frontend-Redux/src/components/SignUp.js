import { Form, Row, Col, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import * as formik from 'formik'
import { Field } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import zappImage from './ZAPP.png'
import zappSVG from './ZAPP.svg'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import signupService from '../services/signup'

const SignUp = () => {
  const { Formik } = formik
  const schema = yup.object().shape({
    username: yup.string().required('Required!'),
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required!'),
  })
  //const [username, setUsername] = useState('')
  return (
    <>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        onSubmit={async (values, { resetForm, setFieldValue }) => {
          // Your form submission logic here

          try {
            const result = await toast.promise(
              signupService.signup(values), // Call your function and pass formData
              {
                pending: 'Verifying your informations..', // Shown while promise is pending
                success: {
                  render() {
                    return `Your registration is complete!
                          You should shortly receive a confirmation`
                  },
                  // other options
                  pauseOnHover: false,
                  position: 'top-center',
                },

                //error: 'Make sure your mail is valid', // Shown on error

                // You can add other options like autoClose, position, etc.
              },
            )
            console.log(values)
            console.log(result)
            resetForm({ values: '' })
          } catch (error) {
            // Handle errors from the toast.promise here
            console.log(error)
            toast.error(error.response.data.message, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
          //
          // setFieldValue('departureAddress', '');
          // console.log('value afteR: ', values);
          //EmailSender.sendMailInformation(values);
        }}
        initialValues={{
          username: '',

          email: '',
          password: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          handleBlur,
          values,
          touched,
          errors,
          initialValues,
        }) => (
          <>
            <div className="container-fluid signup-container">
              <div className=" row gap-5 signup-row">
                <Col md="6">
                  <Card>
                    <Card.Header> Sign up in a few seconds </Card.Header>
                    <Card.Body>
                      <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-1">
                          <div>
                            <p className="group-info">
                              {' '}
                              It takes a few moments to set up an account{' '}
                            </p>
                            <p className="fw-light">sign up and join us</p>
                          </div>
                          <Form.Group as={Col} controlId="validationFormik01">
                            <Form.Label>username</Form.Label>

                            <Form.Control
                              type="text"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              isInvalid={touched.username && !!errors.username}
                              onBlur={handleBlur}
                              isValid={touched.username && !errors.username}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="validationFormik02">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              onBlur={handleBlur}
                              value={values.password}
                              onChange={handleChange}
                              isValid={touched.password && !errors.password}
                              isInvalid={touched.password && !!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="validationFormik03">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              autoComplete="email"
                              name="email"
                              value={values.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              isInvalid={touched.email && !!errors.email}
                              isValid={touched.email && !errors.email}
                            />

                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <div className="col mt-3 d-flex justify-content-center">
                          {' '}
                          <Button type="submit" className="px-5">
                            Sign up! <i className="bi bi-send"></i>
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                    <Card.Footer>
                      {' '}
                      Make sure to enter a valid email address
                      <Link to="/"> Back to login </Link>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col md="5">
                  {' '}
                  <img src={zappSVG} alt="..." className="signup-logo" />
                </Col>
              </div>
            </div>
          </>
        )}
      </Formik>
      <div className="header" style={{ position: 'absolute', top: 0 }}>
        <h3>Zapp</h3>
      </div>
    </>
  )
}

export default SignUp
