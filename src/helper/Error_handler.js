import React, { useState } from "react"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"

export default function ErrorHandler() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Alert show={show} variant="danger">
        <Alert.Heading>Sorry!</Alert.Heading>
        <p>
          It looks like Aggie Heroes has encountered an error. If you wish to
          submit a question or comment please click the button below. If not
          please come back soon, we are actively working on fixing the issue.
          Thank you! Gig'Em!
        </p>
        <hr />
        <div>
          <Button onClick={() => setShow(false)} variant="outline-danger">
            {/* TODO: Navigate to Contact Us */}
            Submit Complaint
          </Button>
          <Button onClick={() => setShow(false)} variant="outline-info">
            Ok
          </Button>
        </div>
      </Alert>
    </>
  )
}
