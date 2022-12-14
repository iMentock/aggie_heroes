import React, { useEffect, useState } from "react"
import { Container, Row, Form, Col, Button, Modal } from "react-bootstrap"
import {
  auth,
  getAllAvailableTutoring,
  getUserNameByUID,
  sendTutoringRequest,
} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import BootstrapTable from "react-bootstrap-table-next"
import { useNavigate } from "react-router-dom"

function Find_Hero() {
  const [user, loading, error] = useAuthState(auth)
  const [availability, setAvailability] = useState([])
  const [rawAvailability, setRawAvailability] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [rowInfo, setRowInfo] = useState(null)
  const navigate = useNavigate()

  const columns = [
    { dataField: "subject", text: "Subject", sort: true },
    { dataField: "user", text: "Name", sort: true },
    { dataField: "morning", text: "Morning", sort: true },
    { dataField: "afternoon", text: "Afternoon", sort: true },
    { dataField: "evening", text: "Evening", sort: true },
    {
      dataField: "link",
      text: "",
      formatter: (rowContent, row) => {
        return (
          <Button
            variant="info"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              setRowInfo(row)
              setShowModal(true)
              console.log("Contact clicked on row -> ", row)
              makeCallToTutor()
            }}
          >
            Contact Tutor
          </Button>
        )
      },
    },
  ]

  const makeCallToTutor = async () => {
    if (rowInfo) {
      setShowModal(false)
      const result = await sendTutoringRequest(user.uid, rowInfo)
      navigate("/dashboard", { replace: true })

      return
    }
    return
  }

  useEffect(() => {
    if (loading) return
    if (user) {
      fetchAllTutoring()
    }
  }, [user, loading])

  useEffect(() => {
    if (rawAvailability.length > 0) {
      setUserNamesInAvailability()
    }
  }, [rawAvailability])

  const setUserNamesInAvailability = async () => {
    let tempArray = []

    for await (const entry of rawAvailability) {
      const userName = await getUserNameByUID(entry.user)

      let temp = {
        morning: entry.morning,
        afternoon: entry.afternoon,
        evening: entry.evening,
        uid: entry.user,
        user: userName,
        subject: entry.subject,
      }

      tempArray.push(temp)
    }
    setAvailability(tempArray)
    setIsLoading(false)
    return
  }

  const fetchAllTutoring = async () => {
    const snapshotData = await getAllAvailableTutoring()
    var holdingArray = []
    await snapshotData.forEach((entry) => {
      console.log(entry.data())
      // let tempData = entry.data()
      // holdingArray.push(tempData)
      if (entry.data().user !== user.uid) {
        let tempData = entry.data()
        holdingArray.push(tempData)
      }
    })
    return setRawAvailability(holdingArray)
  }

  return (
    <Container>
      <Row className="centered_text">
        <h1>Find A Hero</h1>
      </Row>
      {user ? (
        isLoading ? (
          <p>loading...</p>
        ) : (
          <BootstrapTable keyField="id" data={availability} columns={columns} />
        )
      ) : (
        <div className="centered_text my-5">
          <h5 className="red_text">Must be logged in to find a tutor</h5>
          <p>
            Please either <a href="/register">register</a> or{" "}
            <a href="/login">sign in</a>
          </p>
        </div>
      )}
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Contact Tutor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          You are about to request a tutoring session with this user
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => makeCallToTutor()}>
            Continue
          </Button>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Find_Hero
