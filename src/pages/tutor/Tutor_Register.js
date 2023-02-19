import React, { useState } from "react"
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, registerTutor } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { isDisabled } from "@testing-library/user-event/dist/utils"

function Tutor_Register() {
  const navigate = useNavigate()

  const subjects = [
    "English",
    "Math",
    "Literature",
    "Health",
    "Biology",
    "Calculus",
    "Physics",
    "Algebra",
    "Geometry",
    "Anatomy",
    "Physiology",
  ]
  const meetTimes = ["Morning", "Afternoon", "Evening"]
  const [user, loading] = useAuthState(auth)
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [buttonDisable, setButtonDisable] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonDisable(true)

    try {
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
      if (formDataObj) {
        await registerTutor(
          user.uid,
          formDataObj.userSubject,
          formDataObj.Afternoon === "on" ? true : false,
          formDataObj.Evening === "on" ? true : false,
          formDataObj.Morning === "on" ? true : false
        )
        navigate("/dashboard", { replace: true })
        return true
      }
    } catch (err) {
      setButtonDisable(false)
      alert(err.message)
      return false
    }
  }

  const handleSuccess = () => {
    setShow(true)
    setSuccess(true)
  }

  subjects.sort()
  meetTimes.sort()
  var meetTimesList = meetTimes.map((time) => {
    return (
      <Form.Check
        type="switch"
        key={time}
        id="custom-switch"
        label={time}
        name={time}
      />
    )
  })
  var subjectsList = subjects.map((name) => {
    return (
      <option key={name} value={name}>
        {name}
      </option>
    )
  })

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

  return (
    <Container className="my-5">
      {!loading ? (
        <>
          <Row className="centered_text">
            <h1>Become a Hero</h1>
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
                  It looks like Aggie Heroes has encountered an error. If you
                  wish to submit a question or comment please click{" "}
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
          {user ? (
            <>
              <Row className="centered_text">
                <Col xs={4} />
                <Col xs={4}>
                  <p>
                    We match tutors with students looking for help by subject.
                    Please enter subjects you offer tutoring in.
                  </p>
                </Col>
                <Col xs={4} />
              </Row>
              <Row>
                <>
                  <Col xs={4} />
                  <Col xs={4}>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Select
                          name="userSubject"
                          aria-label="Default select"
                        >
                          <option>Select Tutoring Subject</option>
                          {subjectsList}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Meeting Time:</Form.Label>
                        {meetTimesList}
                      </Form.Group>

                      <Button
                        disabled={isDisabled}
                        variant="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                  <Col xs={4} />
                </>
              </Row>
            </>
          ) : (
            <div className="centered_text my-5">
              <h5 className="red_text">Must be logged in to become a tutor</h5>
              <p>
                Please either <a href="/register">register</a> or{" "}
                <a href="/login">sign in</a>
              </p>
            </div>
          )}
        </>
      ) : (
        <p>loading...</p>
      )}
    </Container>
  )
}

export default Tutor_Register
