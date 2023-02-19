import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {
  auth,
  loginWithGoogle,
  loginWithEmailandPassword,
} from "../../firebase"
import { useNavigate } from "react-router-dom"
import { Container, Row, Form, Button, Col, Alert } from "react-bootstrap"

function Login() {
  const [user, loading] = useAuthState(auth)
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/dashboard", { replace: true })
  }, [user, loading])

  useEffect(() => {
    if (error) {
    }
  }, [error])
  const handleError = () => {
    if (!error) {
      return
    }
    let errorString = ""

    if (error.message.includes("user-not-found")) {
      errorString = "User Not Found"
    }
    if (error.message.includes("network-request-failed")) {
      errorString = "Request Failed"
    }

    return errorString
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries())

    try {
      if (formDataObj.userEmail && formDataObj.userPassword) {
        // After login the user will automatically be pushed to dashboard
        await loginWithEmailandPassword(
          formDataObj.userEmail,
          formDataObj.userPassword
        )
      }
    } catch (e) {
      // console.debug(e.message)
      setShow(true)
      setError(e)
      return
    }
  }

  return (
    <Container>
      <Row>
        <div className="centered_text">
          <h1>Login</h1>
        </div>
      </Row>
      <Row style={{ padding: "20px 0" }}>
        <Col />
        <Col xs={4}>
          <Alert show={show} variant="danger">
            <Alert.Heading>
              {error ? `${handleError()}` : "Sorry!"}
            </Alert.Heading>
            <p></p>
            <p>
              It looks like Aggie Heroes has encountered an error. If you wish
              to submit a question or comment please click{" "}
              <a href="mailto: vamartinez@tamu.edu">here</a>.{" "}
            </p>
            <p>
              We are actively working on fixing the issue. Please check back
              again soon.
            </p>
            <p> Thank you! Gig'Em!</p>
            <hr />
            <div>
              <Button
                onClick={() => setShow(false)}
                variant="outline-secondary"
              >
                Ok
              </Button>
            </div>
          </Alert>
        </Col>
        <Col />
      </Row>
      {!show ? (
        <>
          <Row>
            <Col xs={4} />
            <Col xs={4}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="userEmail"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="userPassword"
                  />
                </Form.Group>
                <Button className="mb-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <a href={"/forgot"}>Forgot Password?</a>
            </Col>
            <Col xs={4} />
          </Row>
          <Row className="centered_text mt-4 mb-2">
            <h4>Or Login with</h4>
          </Row>
          <Row className="centered_text mb-4">
            <Col xs={4} />
            <Col xs={4}>
              <Button onClick={loginWithGoogle} variant="danger">
                <i className="fa-brands fa-google mx-2"></i>
                Login with Google
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
          <Row className="centered_text mb-5">
            <a href="/register">I need to create an account</a>
          </Row>
        </>
      ) : null}
    </Container>
  )
}

export default Login
