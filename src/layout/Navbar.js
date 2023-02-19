import { Container, Navbar, Nav, Offcanvas, Row } from "react-bootstrap"
import logo from "../images/ah_logo.png"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth, db, logOut } from "../firebase"
import { query, collection, where, getDocs } from "firebase/firestore"

function OffCanvasErrorContainer() {
  const [show, setShow] = useState(true)
  const handleClose = () => {
    // dismiss
    setShow(false)
    // log the user out for convenience and safety
    logOut()
  }

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        placement="top"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "red" }}>Sorry!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Aggie Heroes has encountered an issue with your account. There is no
          action needed on your end. We are aware of the issue and are actively
          working on it! You will now be logged out.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default function AHNavbar() {
  const [user, loading] = useAuthState(auth)
  const [name, setName] = useState("")
  const [show, setShow] = useState(false)
  const [processing, setIsProcessing] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) {
      if (name.length < 1) {
        fetchUserName()
      }
    }
    return
  }, [user, loading])

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.info(doc.data().name)
        setName(doc.data().name)
      })
      setIsProcessing(false)
      return
    } catch (err) {
      setIsProcessing(false)
      setShow(true)
      return
    }
  }

  return (
    <>
      <Container>
        {show ? <OffCanvasErrorContainer /> : null}

        <Navbar expand="lg">
          <img src={logo} className="m-3" width="45" alt="Aggie Heroes Logo" />
          <Navbar.Brand id="brand" className="me-auto" href="/">
            Aggie Heroes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav>
              <Nav.Link href={"/about"}>About Us</Nav.Link>
              <Nav.Link href={"/find"}>Find A Hero</Nav.Link>
              <Nav.Link href={"/tutor_sign_up"}>Become A Tutor</Nav.Link>
              {user ? (
                <>
                  {!processing ? (
                    <Nav.Link href={"/dashboard"}>{name}'s Dashboard</Nav.Link>
                  ) : (
                    <Nav.Link href={"/dashboard"}>Your Dashboard</Nav.Link>
                  )}

                  <Nav.Link
                    onClick={() => {
                      logOut()
                      setTimeout(() => {
                        navigate("/", { replace: true })
                      }, "250")
                    }}
                  >
                    Signout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href={"/login"}>Login</Nav.Link>
                  <Nav.Link href={"/register"}>Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  )
}
