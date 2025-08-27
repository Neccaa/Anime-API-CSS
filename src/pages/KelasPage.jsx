import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import FaqComponent from "../components/FaqComponent";

const KelasPage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] =
    useState("naruto");
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] =
    useState(8);
  const [showAll, setShowAll] = useState(false);

  const fetchAnime = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
      );
      const data = await res.json();
      setAnimeList(data.data || []);
    } catch (err) {
      console.error(
        "Failed to fetch anime:",
        err
      );
    }
    setLoading(false);
    setVisibleCount(8);
    setShowAll(false);
  };

  useEffect(() => {
    fetchAnime();
  }, [searchTerm]);

  function handleSearch() {
    setSearchTerm(query);
  }

  return (
    <div className="kelas-page">
      <div className="kelas min-vh-100 py-5">
        <Container>
          {/* Header */}
          <Row>
            <Col>
              <h1 className="fw-bold text-center">
                Daftar Anime
              </h1>
              <p className="text-center text-muted">
                Anime yang diambil langsung dari
                Jikan API (MyAnimeList).
              </p>
            </Col>
          </Row>

          {/* Search Form */}
          <Row className="mb-4 mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <div className="input-group shadow-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari anime seperti One Piece, Jujutsu Kaisen, dll..."
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      handleSearch();
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                >
                  Cari
                </button>
              </div>
            </Col>
          </Row>

          {/* Loading shimmer */}
          {loading && (
            <Row className="mt-4">
              {Array.from({ length: 8 }).map(
                (_, idx) => (
                  <Col
                    key={idx}
                    xs={6}
                    sm={6}
                    md={3}
                    className="mb-4"
                  >
                    <div className="anime-card shimmer">
                      <div className="anime-img shimmer-bg" />
                      <div className="anime-text shimmer-bg w-75 mt-2" />
                      <div className="anime-text shimmer-bg w-50 mt-1" />
                      <div className="anime-button shimmer-bg mt-2" />
                    </div>
                  </Col>
                )
              )}
            </Row>
          )}

          {/* Anime Cards */}
          {!loading && animeList.length === 0 && (
            <Row className="mt-4">
              <Col>
                <p className="text-center text-muted fw-bold">
                  ❌ Tidak ada data ditemukan
                </p>
              </Col>
            </Row>
          )}

          {!loading && animeList.length > 0 && (
            <>
              <Row className="mt-4">
                {animeList
                  .slice(0, visibleCount)
                  .map((anime) => (
                    <Col
                      key={anime.mal_id}
                      xs={6}
                      sm={6}
                      md={3}
                      className="mb-4"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <div className="anime-card">
                        <img
                          src={
                            anime.images.jpg
                              .image_url
                          }
                          alt={anime.title}
                          className="w-100 rounded-top"
                        />
                        <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <h5 className="mb-2">
                              {anime.title}
                            </h5>
                            <p className="mb-1 text-muted">
                              Score:{" "}
                              {anime.score ??
                                "N/A"}
                            </p>
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

              {/* Show All Button */}
              {animeList.length > 8 && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      if (showAll) {
                        setVisibleCount(8);
                        setShowAll(false);
                      } else {
                        setVisibleCount(
                          animeList.length
                        );
                        setShowAll(true);
                      }
                    }}
                  >
                    {showAll
                      ? "Sembunyikan"
                      : "Lihat Semua"}
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </div>

      {/* FAQ */}
      <FaqComponent />
    </div>
  );
};

export default KelasPage;
