import { Image, Row, Col, Container } from "react-bootstrap"

export default function Mission_Statement() {
  return (
    <div className="mission_statement white_text centered_text p-5 mt-3 mb-3 rounded_corners">
      <Container style={{ color: "CaptionText" }}>
        <Row>
          <h1>Mission Statement</h1>
        </Row>
        <Row>
          <p>
            To inspire and empower the Aggie community through fostering a
            culture of selfless service and strong leadership, leading to
            academic excellence and personal growth for all.
          </p>
        </Row>
      </Container>
    </div>
  )
}
