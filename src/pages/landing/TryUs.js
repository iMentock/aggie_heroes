import { Container, Card, Image, Row, Col } from "react-bootstrap"
import img from "../../images/landing/try_us/you_can.jpg"

export default function TryUs() {
  return (
    <div className="try_us_section">
      <Container>
        <Row>
          <h2 className="centered_text">Try Us Out</h2>
        </Row>
        <Row xs={1} sm={2}>
          <Col xs={12} sm={4} className="try_us_left">
            <Image
              src={img}
              className="try_us_image"
              alt="An image centered on 9 small tiles forming a square spelling yes you can."
            />
          </Col>
          <Col xs={12} sm={8} className="try_us_right">
            <Card id="try_us_card" className="text-center">
              <Card.Body>
                <Card.Text className="dark_text">
                  We offer one-one-one tutoring services for all TAMU students.
                  Our tutors cover a plethora of subjects and are ranked by you.
                  Stressed out about that next test? Rest assured a hero is here
                  ready to bring that good bull to YOUR GPA!
                </Card.Text>
                <Card.Link href="#">Find Your Hero</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
