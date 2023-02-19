import { Container, Card, Row, CardGroup, Col } from "react-bootstrap"
import math from "../../images/landing/p_subjects/math.jpg"
import l_arts from "../../images/landing/p_subjects/l_arts.jpg"
import history from "../../images/landing/p_subjects/history.jpg"
import biology from "../../images/landing/p_subjects/biology.jpg"
import p_science from "../../images/landing/p_subjects/p_science.jpg"
import spanish from "../../images/landing/p_subjects/spanish.jpg"
import logic from "../../images/landing/p_subjects/logic.jpg"
import physics from "../../images/landing/p_subjects/physics.jpg"

const subjects = {
  Math: math,
  "Language Arts": l_arts,
  History: history,
  Biology: biology,
  "Political Science": p_science,
  Spanish: spanish,
  Logic: logic,
  Physics: physics,
}

export default function P_Subjects() {
  return (
    <Container>
      <Row>
        <h2 className="centered_text p_subject_title">Popular Subjects</h2>
      </Row>
      <CardGroup>
        <Row xs={2} md={4} className="g-4">
          {Object.keys(subjects).map((key, index) => (
            <Card className="p_subject_card">
              <Card.Img
                src={subjects[key]}
                alt={`An image representing the subject ${key}.`}
              />
              <Card.ImgOverlay>
                <div id="p_subject_card_title">
                  <h2>{key}</h2>
                </div>
              </Card.ImgOverlay>
            </Card>
          ))}
        </Row>
      </CardGroup>
    </Container>
  )
}
