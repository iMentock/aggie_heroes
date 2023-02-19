import { Container, Row, Col, Image } from "react-bootstrap"
import smile_guy from "../../images/landing/testimonials/smile_guy.jpg"

function Testimonials() {
  return (
    <div className="testimonials p-5 mt-5 mb-5">
      <Container>
        <Row>
          <h1 className="centered_text">Testimonials</h1>
        </Row>
        <Row className="centered_text">
          <Col
            xs={{ order: 2, span: 10 }}
            md={{ order: 1, span: 8 }}
            className="d-flex align-items-center justify-items-center flex-direction-column"
          >
            <p>
              "Aggie Heroes came through when I really needed it. Signing up was
              easy and matching with a tutor was easy as well. I've been
              recommending it to all my friends and it has already helped a few
              of them!"
            </p>

            <em>- Cody Tatum</em>
          </Col>
          <Col xs={{ order: 1, span: 6 }} md={{ order: 2, span: 4 }}>
            <Image
              src={smile_guy}
              className="test_pic image_white_border"
              roundedCircle={true}
              alt="A picture of a man smiling"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Testimonials
