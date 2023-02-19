import { Image, Row, Col } from "react-bootstrap"
import logo from "../../images/ah_logo.png"

export default function About_Hero() {
  return (
    <div>
      <Row className="centered_text">
        <Col xs={4} />
        <Col xs={4}>
          <Image alt="Marroon Aggie Heroes logo" src={logo} width="150px" />
        </Col>
        <Col xs={4} />
      </Row>
      <Row>
        <Col xs={4} />
        <Col xs={4} className="centered_text">
          <h1 id="hero_main_text">About Us</h1>
        </Col>
        <Col xs={4} />
      </Row>
    </div>
  )
}
