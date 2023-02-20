import { Container, Image, Col, Row } from "react-bootstrap"
import logo from "../images/ah_logo.png"

export default function Footer() {
  return (
    <div className="grey_background footer">
      <Container>
        <Row style={{ paddingTop: "20px" }}>
          <Col>
            <ul className="contrast_link">
              <li>
                <a href="/about">About</a>
              </li>
              <span>
                <li>
                  <a className="disable-links" href="#" disabled tabindex="-1">
                    Contact Us - (coming soon)
                  </a>
                </li>
                <li>
                  <a className="disable-links" href="#" disabled tabindex="-1">
                    For Tutors - (coming soon)
                  </a>
                </li>
                <li>
                  <a className="disable-links" href="#" disabled tabindex="-1">
                    Get Help - (coming soon)
                  </a>
                </li>
              </span>
            </ul>
          </Col>
          <Col className="centered_text">
            <Image src={logo} width="100px" alt="Aggie Heroes logo in maroon" />
          </Col>
          <Col>
            <ul>
              <li>Copyright Aggie Heroes 2022</li>
              <li>(979)111-1111</li>
              <li>aggieheroes@notreal.com</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
