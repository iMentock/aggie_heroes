import { Image, Row, Col, Container } from "react-bootstrap"

export default function Mission_Statement() {
  return (
    <div className="mission_statement white_text centered_text p-5 mt-3 mb-3 rounded_corners">
      <Container>
        <Row>
          <h1>Mission Statement</h1>
        </Row>
        <Row>
          <p>
            Our team seeks to emphasize selfless service and leadership among
            Aggies to improve academic achievements.
          </p>
        </Row>
      </Container>
    </div>
  )
}
