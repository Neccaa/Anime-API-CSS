import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";
import { dataSwiper } from "../data/index";
import { useNavigate } from "react-router-dom";
import FaqComponent from "../components/FaqComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Homepage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/anime");
        const data = await res.json();
        if (data.data && Array.isArray(data.data)) {
          setAnimeList(data.data);
          setTopAnime(data.data.slice(0, 10)); // Banner top 10 anime
        } else {
          console.error("Format data anime tidak sesuai", data);
        }
      } catch (error) {
        console.error("Gagal mengambil data anime", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnime();
  }, []);

  const displayedAnime = showAll ? animeList : animeList.slice(0, 8);

  // Shimmer loading effect component
  const shimmerBanner = (
    <div className="d-flex flex-column flex-lg-row align-items-center">
      <div className="shimmer rounded" style={{ width: "300px", height: "300px" }} />
      <div className="ms-lg-4 text-center text-lg-start w-100">
        <div className="shimmer shimmer-title mb-3" style={{ height: "30px", width: "70%" }} />
        <div className="shimmer shimmer-text mb-2" style={{ height: "20px", width: "100%" }} />
        <div className="shimmer shimmer-text mb-2" style={{ height: "20px", width: "90%" }} />
        <div className="shimmer shimmer-text mb-2" style={{ height: "20px", width: "80%" }} />
        <div className="shimmer shimmer-button mt-3" style={{ height: "40px", width: "120px", margin: "0 auto" }} />
      </div>
    </div>
  );

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center bg-light">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6" className="animate__animated animate__fadeInUp">
              <h1 className="mb-4 fw-bold display-5">
                🎥 Temukan{" "}
                <span className="text-primary">Anime Terbaik</span>
                <br />
                Dari yang <span className="text-danger">Legend</span>{" "}
                Sampai yang <span className="text-success">Terbaru</span>!
              </h1>
              <p className="mb-4 fs-5">
                Data diambil langsung dari MyAnimeList. Yuk jelajahi dunia anime sekarang!
              </p>
              <button
                className="btn btn-primary btn-lg rounded-pill"
                onClick={() => navigate("/kelas")}
              >
                🎬 Tonton Lainnya
              </button>
            </Col>

            <Col lg="6" className="pt-lg-0 pt-5 d-none d-lg-block animate__animated animate__fadeInUp">
              <img src={HeroImage} alt="hero-img" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </header>

   <div className="text-dark py-5" style={{ marginTop: "100px", backgroundColor: "white" }}>
  <Container>
    <h2 className="text-center fw-bold mb-4">Anime Terpopuler</h2>
    {isLoading ? (
      shimmerBanner
    ) : (
      <>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="anime-banner-swiper"
          style={{ cursor: "grab" }}
        >
          {topAnime.map((anime) => (
            <SwiperSlide key={anime.mal_id}>
              <div className="d-flex flex-column flex-lg-row align-items-center">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="img-fluid rounded mb-3 mb-lg-0"
                  style={{ maxWidth: "300px", height: "auto", objectFit: "cover" }}
                />
                <div className="ms-lg-4 text-center text-lg-start">
                  <h4 className="fw-bold">{anime.title}</h4>
                  <p style={{ maxWidth: "600px" }}>{anime.synopsis?.slice(0, 200)}...</p>
                  <a href={anime.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark mt-2">
                    Lihat Detail
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )}
  </Container>
</div>


      {/* Anime Terbaru Section */}
      <div className="anime-list py-5 ">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Anime Terbaru</h2>
              <p className="text-muted">Anime paling populer saat ini dari MyAnimeList</p>
            </Col>
          </Row>

          {isLoading ? (
            <Row className="row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {[...Array(8)].map((_, index) => (
                <Col key={index}>
                  <div className="anime-card bg-white rounded shadow-sm w-100 d-flex flex-column">
                    <div className="w-100 shimmer rounded-top" style={{ height: '200px' }} />
                    <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                      <div className="shimmer shimmer-title mb-2" style={{ height: '20px', width: '70%' }} />
                      <div className="shimmer shimmer-score mb-1" style={{ height: '15px', width: '50%' }} />
                      <div className="shimmer shimmer-button mt-3" style={{ height: '30px', width: '100px' }} />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <Row className="row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {displayedAnime.map((anime) => (
                  <Col key={anime.mal_id} className="d-flex">
                    <div className="anime-card bg-white rounded shadow-sm w-100 d-flex flex-column">
                      <img
                        src={anime.images.jpg.image_url}
                        alt={anime.title}
                        className="w-100 rounded-top"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                          <h5 className="mb-2">{anime.title}</h5>
                          <p className="mb-1 text-muted">Score: {anime.score ?? "N/A"}</p>
                        </div>
                        <a
                          href={anime.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-danger btn-sm w-100 text-center"
                        >
                          Detail
                        </a>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              {animeList.length > 8 && (
                <div className="text-center mt-4">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Sembunyikan" : "Lihat Semua"}
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </div>

      {/* Ulasan */}
      <div className="testimonial py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold my-5">Ulasan</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 2, spaceBetween: 50 },
                1200: { slidesPerView: 3, spaceBetween: 50 },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataSwiper.map((data) => (
                <SwiperSlide key={data.id} className="shadow-sm p-4">
                  <p className="people">{data.desc}</p>
                  <div className="people">
                    <img src={data.image} alt="testimonial" />
                    <div>
                      <h5 className="mb-1">{data.name}</h5>
                      <p className="m-0 fw-bold">{data.skill}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
        </Container>
      </div>

      <FaqComponent />
    </div>
  );
};

export default Homepage;