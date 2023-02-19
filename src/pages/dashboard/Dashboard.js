import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Modal,
  Button,
  Col,
  Card,
  Spinner,
} from "react-bootstrap"
import {
  getAllTutoringForUser,
  auth,
  removeTutorSpot,
  getAllRequestsForUser,
  getUserNameByUID,
  confirmTutoringRequest,
  denyTutoringRequest,
  getAllRequestsFromUser,
  getEmailByUsername,
} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import Error_handler from "../../helper/Error_handler"

function Dashboard() {
  const [entries, setEntries] = useState([])
  const [user, loading, error] = useAuthState(auth)
  const [isLoading, setIsLoading] = useState(false)
  const [yourRequests, setYourRequests] = useState([])
  const [outGoingRequests, setOutgoingRequests] = useState([])
  const [show, setShow] = useState(false)
  const [tutorEmail, setTutorEmail] = useState("")
  const [tutorName, setTutorName] = useState("")

  useEffect(() => {
    if (loading) return
    if (user) {
      fetchUsersTutoring()
    }
  }, [user, loading])

  useEffect(() => {
    if (tutorName !== "") {
      fetchUserNameForContact()
    }
  }, [tutorName])

  const fetchUserNameForContact = async () => {
    const email = await getEmailByUsername(tutorName)
    return setTutorEmail(email)
  }

  const handleRemove = async (userID, subject) => {
    setIsLoading(true)
    await removeTutorSpot(userID, subject)
    setIsLoading(false)
    fetchUsersTutoring()
  }

  const fetchUsersTutoring = async () => {
    try {
      const tutoringAvailable = await getAllTutoringForUser(user.uid)
      let holdingArray = []
      tutoringAvailable.forEach((doc) => {
        holdingArray.push(doc.data())
      })
      setEntries(holdingArray)
      await fetchUsersRequests()
      return
    } catch (err) {
      return <>{Error_handler()}</>
    }
  }

  const fetchUsersRequests = async () => {
    try {
      // get the username
      let userName = await getUserNameByUID(user.uid)
      const tutoringAvailable = await getAllRequestsForUser(userName)

      let holdingArray = []
      tutoringAvailable.forEach((doc) => {
        // console.log(doc.data())
        holdingArray.push(doc.data())
      })

      let secondHoldingArray = []
      for await (const entry of holdingArray) {
        let fromUserName = await getUserNameByUID(entry.fromUser)
        let temp = {
          morning: entry.morning,
          afternoon: entry.afternoon,
          evening: entry.evening,
          forUser: entry.forUser,
          fromUser: fromUserName,
          subject: entry.subject,
          confirmed: entry.confirmed,
        }
        secondHoldingArray.push(temp)
      }

      setYourRequests(secondHoldingArray)
      await fetchOutgoingRequests()
      return
    } catch (err) {
      // console.error(err)
      // alert(err.message)
      return <>{Error_handler()}</>
    }
  }

  const fetchOutgoingRequests = async () => {
    try {
      // get the username
      const tutoringAvailable = await getAllRequestsFromUser(user.uid)

      let holdingArray = []
      tutoringAvailable.forEach((doc) => {
        holdingArray.push(doc.data())
      })

      let secondHoldingArray = []

      for await (const entry of holdingArray) {
        let fromUserName = await getUserNameByUID(entry.fromUser)
        let temp = {
          morning: entry.morning,
          afternoon: entry.afternoon,
          evening: entry.evening,
          forUser: entry.forUser,
          fromUser: fromUserName,
          subject: entry.subject,
          confirmed: entry.confirmed,
        }
        secondHoldingArray.push(temp)
      }

      setOutgoingRequests(secondHoldingArray)
      return
    } catch (err) {
      // console.error(err)
      // alert(err.message)
      return <>{Error_handler()}</>
    }
  }

  const handleConfirm = async (requestData) => {
    try {
      const tutoringAvailable = await confirmTutoringRequest(
        requestData,
        user.uid
      )

      fetchUsersRequests()
      return
    } catch (err) {
      // console.error(err)
      // alert(err.message)
      return <>{Error_handler()}</>
    }
  }

  const handleDeny = async (requestData) => {
    try {
      const _ = await denyTutoringRequest(requestData, user.uid)

      fetchUsersRequests()
      return
    } catch (err) {
      console.error("Should see error")
      return showError()
    }
  }

  const showError = () => {
    return Error_handler()
  }

  const tutoringCards = entries.map((entry) => {
    return (
      <Col xs={3}>
        <Card key={entry.id}>
          <Card.Body>
            <Card.Title>{entry.subject}</Card.Title>
            <Card.Subtitle>Your availability:</Card.Subtitle>

            <Card.Text>
              <ul>
                <li key={entry.subject}>
                  {entry.morning ? (
                    <i className="fa-regular fa-clock green" />
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  morning
                </li>
                <li key={entry.subject}>
                  {entry.afternoon ? (
                    <i className="fa-regular fa-clock green" />
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  afternoon
                </li>
                <li key={entry.subject}>
                  {entry.evening ? (
                    <i className="fa-regular fa-clock green" />
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  evening
                </li>
              </ul>
              {isLoading ? (
                <Button variant="danger" size="sm" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span> loading...</span>
                </Button>
              ) : (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(user.uid, entry.subject)}
                >
                  Remove
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  const requestCards = yourRequests.map((request) => {
    return (
      <Col xs={3}>
        <Card key={request.id}>
          <Card.Body>
            <Card.Title>{request.subject}</Card.Title>
            <Card.Subtitle>
              From User: <em>{request.fromUser}</em>
            </Card.Subtitle>

            <Card.Text>
              <ul>
                <li key={request.subject}>
                  {request.morning ? (
                    <i className="fa-regular fa-clock green" />
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  morning
                </li>
                <li key={request.subject}>
                  {request.afternoon ? (
                    <i className="fa-regular fa-clock green" />
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  afternoon
                </li>
                <li key={request.subject}>
                  {request.evening ? (
                    <i className="fa-regular fa-clock green" />
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  evening
                </li>
              </ul>
              <p>
                Status:{" "}
                {request.confirmed ? (
                  <>
                    <i className="fa-regular fa-circle-check green"></i>
                    <span> Confirmed</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-xmark red red"></i>
                    <span> Denied</span>
                  </>
                )}
              </p>
              {isLoading ? (
                <Button variant="danger" size="sm" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span> loading...</span>
                </Button>
              ) : (
                <>
                  <Button size="sm" onClick={() => handleConfirm(request)}>
                    Confirm
                  </Button>
                  <Button
                    className="mx-2"
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeny(request)}
                  >
                    Deny
                  </Button>
                </>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  const outgoingRequestCards = outGoingRequests.map((request) => {
    return (
      <Col xs={3}>
        <Card key={request.id}>
          <Card.Body>
            <Card.Title>{request.subject}</Card.Title>
            <Card.Subtitle>User: {request.forUser}</Card.Subtitle>
            <em>Availability:</em>
            <Card.Text>
              <ul>
                <li key={request.subject}>
                  {request.morning ? (
                    <i className="fa-regular fa-circle-check green"></i>
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  morning
                </li>
                <li key={request.subject}>
                  {request.afternoon ? (
                    <i className="fa-regular fa-circle-check green"></i>
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  afternoon
                </li>
                <li key={request.subject}>
                  {request.evening ? (
                    <i className="fa-regular fa-circle-check green"></i>
                  ) : (
                    <i className="fa-solid fa-x red"></i>
                  )}{" "}
                  evening
                </li>
              </ul>
              <p>
                {request.confirmed ? (
                  <>
                    <i className="fa-regular fa-circle-check green"></i>{" "}
                    <span> Confirmed by tutor</span>
                    <hr />
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setTutorName(request.forUser)
                        setShow(true)
                      }}
                    >
                      Contact Tutor
                    </Button>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-xmark red red"></i>
                    <span> Denied by tutor</span>
                  </>
                )}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  return (
    <Container className="my-5 dashboard">
      <Row className="centered_text mb-5">
        <h1>Dashboard</h1>
      </Row>
      {!loading ? (
        <>
          {!user ? (
            <div className="centered_text my-5">
              <h5 className="red_text">Must be logged in to find a tutor</h5>
              <p>
                Please either <a href="/register">register</a> or{" "}
                <a href="/login">sign in</a>
              </p>
            </div>
          ) : (
            <>
              <Row>
                <h2>Tutoring</h2>
                {entries.length > 0 ? <>{tutoringCards}</> : <p>no openings</p>}
              </Row>
              <hr />
              <Row>
                <h2>Requests For Tutoring</h2>
                {yourRequests.length > 0 ? (
                  <>{requestCards}</>
                ) : (
                  <p>no requests yet</p>
                )}
              </Row>
              <hr />
              <Row>
                <h2>Requests Sent</h2>
                {outGoingRequests.length > 0 ? (
                  <>{outgoingRequestCards}</>
                ) : (
                  <p>no requests yet</p>
                )}
              </Row>
              <Modal show={show}>
                <Modal.Header>
                  <Modal.Title>Contact Tutor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Contact the tutor at{" "}
                    <span className="fw-bold">{tutorEmail}</span>
                  </p>
                  <p>
                    note: we are currently working on in app messaging. For now
                    please set up meetings via email or phone if you chose. We
                    always advise using caution when meeting. Use your best
                    judgement, and adhere to the Aggie code of conduct. We
                    appreciate our community, Gig'em!
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </>
      ) : (
        <p>loading...</p>
      )}
    </Container>
  )
}

export default Dashboard
