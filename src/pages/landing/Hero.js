import ah_logo from "../../images/ah_logo.png"
import { Container, Row, Col, Image, Card, Button, Form } from "react-bootstrap"

var logo_style = {
  backgroundColor: "white",
  minWidth: "150px",
  maxHeight: "300px",
  margin: "19px auto",
}

function HeroSearch() {
  return (
    <>
      <Row>
        <Col xs={9}>
          <Form.Control
            type="text"
            id="searchValue"
            placeholder="subject or name"
            aria-labelledby="searchValue"
          />
        </Col>
        <Col xs={2}>
          <Button>Search</Button>
        </Col>
      </Row>
    </>
  )
}

export default function Hero() {
  return (
    <div className="d-flex align-items-center hero_section">
      <Container>
        <Row>
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 6, order: 1 }}
            className="d-flex align-items-center"
          >
            <div>
              <h1 id="hero_main_text">Aggie HeroSearch</h1>
              <hr />
              <h2 id="hero_main_text">"Bringing Good Bull to Your GPA"</h2>
              <Card bg="light" text="dark">
                <Card.Body>
                  <Card.Title>Find your hero now</Card.Title>
                  <Card.Text>{HeroSearch()}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 6, order: 2 }}
            className="d-flex align-items-center"
          >
            <Image
              roundedCircle={true}
              src={ah_logo}
              style={logo_style}
              alt={"Aggie Hero Logo"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
