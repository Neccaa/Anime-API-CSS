import { Container, Row, Col } from "react-bootstrap";
import FaqComponent from "../components/FaqComponent";

const SyaratKetenPage = () => {
  return (
    <div>
      <div className="syarat-ketentuan-page">
        <div className="syarat-ketentuan min-vh-100">
          <Container>
            <Row>
              <Col>
                <h1 className="fw-bold text-center mb-2 animate__animated animate__fadeInUp animate__delay-1s">
                  Panduan & Aturan Komunitas
                </h1>
                <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                  Halaman ini berisi panduan umum dan aturan komunitas bagi semua otaku dan pecinta anime yang bergabung bersama kami.
                </p>
              </Col>
            </Row>

            <Row className="pt-5">
              <Col>
                <p>
                  Dengan bergabung ke komunitas ini, kamu dianggap telah membaca dan setuju dengan semua panduan dan aturan yang berlaku. Yuk, kita ciptakan suasana seru, positif, dan saling menghargai antar sesama wibu!
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <h4 className="fw-bold">1. Etika Komunitas</h4>
                <p>
                  Hargai semua anggota komunitas, baik yang baru mulai nonton anime maupun yang sudah veteran. Tidak diperbolehkan melakukan penghinaan, diskriminasi, atau komentar toxic.
                </p>
                <p>
                  Hindari spoiler di ruang publik tanpa tanda peringatan. Gunakan tag spoiler jika ingin membahas cerita anime/manga terbaru.
                </p>
              </Col>
            </Row>

            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">2. Konten yang Dibagikan</h4>
                <p>
                  Bebas berbagi fanart, rekomendasi anime, meme, hingga review episode terbaru, asalkan tidak mengandung unsur SARA, pornografi, atau kekerasan ekstrem.
                </p>
                <p>
                  Kami menghargai karya kreator. Jangan reupload fanart atau konten tanpa izin atau tanpa memberikan kredit yang pantas.
                </p>
              </Col>
            </Row>

            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">3. Event & Kegiatan Komunitas</h4>
                <p>
                  Komunitas ini rutin mengadakan event seperti kuis anime, nobar (nonton bareng), cosplay virtual, dan diskusi episode terbaru. Pastikan kamu ikut meramaikan!
                </p>
                <p>
                  Jadwal dan ketentuan tiap event akan diumumkan di grup dan media sosial komunitas. Patuhi ketentuan agar semua bisa menikmati keseruan bersama.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <FaqComponent />
    </div>
  );
};

export default SyaratKetenPage;
