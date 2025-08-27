import { Container, Row, Col } from "react-bootstrap";
import { testimonial } from "../data/index";
import FaqComponent from "../components/FaqComponent";

const TestimonialsPage = () => {
  return (
    <div className="testimonial-page py-5">
      <Container>
        <Row className="mb-5">
          <Col>
           <h1 className="text-center fw-bold animate__animated animate__fadeInUp animate__delay-1s">
  Review Anime dari Penggemar
</h1>
<p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
  Kumpulan pendapat dan kesan menarik dari para penonton anime sejati. 
  Temukan anime favoritmu lewat pengalaman mereka!
</p>

          </Col>
        </Row>

        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {testimonial.map((data) => (
            <Col key={data.id}>
              <div className="p-4 shadow-sm rounded bg-white h-100 d-flex flex-column justify-content-between">
                <p className="mb-4">"{data.desc}"</p>
                <div className="d-flex align-items-center">
                  <img
                    src={data.image}
                    alt="testimonial"
                    className="rounded-circle me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div>
                    <h5 className="mb-1 fw-bold">{data.name}</h5>
                    <p className="mb-0 text-muted">{data.skill}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="mt-5">
        <FaqComponent />
      </div>
    </div>
  );
};

export default TestimonialsPage;