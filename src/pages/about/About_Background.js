import { Image, Row, Col, Container } from "react-bootstrap"
import circle_image from "../../images/about_us/work.jpg"

export default function About_Background() {
  return (
    <div className="maroon_background rounded_corners p-5">
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <Image
              src={circle_image}
              roundedCircle={true}
              fluid={true}
              className="image_white_border"
              alt="Marroon Aggie Heroes logo"
            />
          </Col>
          <Col xs={12} sm={8} className="white_text">
            <h1>Background Of Aggie Heroes</h1>
            <p>
              We are a university wide tutoring app that seeks to connect Aggies
              with Aggies. Our app seeks to leverage individual strengths in an
              attempt to support student's current opportunities for academic
              growth and excellence. Our tutoring platform, Aggie Heroes, takes
              individuals who are struggling academically and offers them a
              mutal opportunity to improve those areas and to assist other
              Aggies improve in areas they excel.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
