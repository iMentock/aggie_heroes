import React from "react"
import { Container, Row, Form, Button, Col } from "react-bootstrap"
import { sendPasswordReset } from "../../firebase"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
  const navigate = useNavigate()

  const handleResetPressed = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())

      if (formDataObj && formDataObj.userEmail) {
        console.log(formDataObj)
        //   setUserEmail(formDataObj.userEmail)
        const result = await sendPasswordReset(formDataObj.userEmail)
        if (result) navigate("/", { replace: true })
      }
    } catch (err) {
      return err.message
    }
  }

  return (
    <Container className="my-5">
      <Row className="centered_text">
        <h1>Password Reset</h1>
      </Row>
      <Row className="mt-5">
        <Col xs={3} />
        <Col xs={6}>
          <h5>Need help with your account?</h5>
          <p>
            Don't worry we all forgot passwords from time to time! Would you
            like to send a password reset link?
          </p>
        </Col>
        <Col xs={3} />
      </Row>
      <Row>
        <Col xs={3} />
        <Col xs={6}>
          <Form onSubmit={handleResetPressed}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="userEmail" />
            </Form.Group>
            <Button className="mt-3" type="submit" size="lg">
              Reset Password
            </Button>
          </Form>
        </Col>
        <Col xs={3} />
      </Row>
    </Container>
  )
}

export default ForgotPassword
