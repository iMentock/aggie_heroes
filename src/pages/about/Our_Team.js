import { Image, Row, Col, Carousel, Container } from "react-bootstrap"
import virgil from "../../images/about_us/virgil.png"

function team_caro() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <Image
            className="rounded_corners"
            src={virgil}
            alt="team member image"
            fluid={true}
          />
          <Carousel.Caption>
            <h3>Virgil</h3>
            <p>team member description</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="rounded_corners"
            src={virgil}
            alt="team member image"
            fluid={true}
          />
          <Carousel.Caption>
            <h3>Virgil</h3>
            <p>team member description</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default function Our_Team() {
  return (
    <div className="mt-3 mb-3">
      <Container>
        <Row>
          <h1 className="centered_text mb-3" id="hero_main_text">
            Our Team
          </h1>
        </Row>
        <Row>
          <Col xs={3} />
          <Col xs={6}>{team_caro()}</Col>
          <Col xs={3} />
        </Row>
      </Container>
    </div>
  )
}
