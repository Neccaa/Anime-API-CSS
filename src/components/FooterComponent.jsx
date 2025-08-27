import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="footer py-5 bg-light text-dark">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h1 className="fw-bold">AnimeNesia</h1>
            <p className="desc">
              Temukan anime favoritmu, jadwal rilis musim terbaru, ulasan komunitas, dan berita terkini dari dunia anime. AnimeNesia adalah rumah bagi semua otaku Indonesia!
            </p>
            <div className="no mb-1 mt-4 d-flex align-items-center">
              <i className="fa-brands fa-discord me-2"></i>
              <p className="m-0">Join Discord: anime.gg/discord</p>
            </div>
            <div className="mail d-flex align-items-center mt-2">
              <i className="fa-regular fa-envelope me-2"></i>
              <p className="m-0">support@animenesia.id</p>
            </div>
          </Col>

          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold">Navigasi</h5>
            <Link to="/">Beranda</Link>
            <Link to="/kelas">Cari Anime</Link>
            <Link to="/jadwal">Jadwal</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/komunitas">Komunitas</Link>
          </Col>

          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold mb-3">Langganan Update Anime & Event</h5>
            <div className="subscribes d-flex">
              <input type="text" className="form-control rounded-0" placeholder="Masukkan email otaku Anda..." />
              <button className="btn btn-danger rounded-end rounded-0">Langganan</button>
            </div>
            <div className="sosial mt-3 d-flex gap-3">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p className="text-center px-md-0 px-3 m-0">
              &copy; {new Date().getFullYear()} <span className="fw-bold">AnimeNesia</span>. Made with ❤️ by fans, for fans.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;
