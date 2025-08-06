import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      setIsLeaving(true); // aktifkan animasi keluar

      setTimeout(() => {
        navigate("/"); // arahkan setelah 0.5 detik
      }, 500);
    }
  };

  const handleGoogleLogin = () => {
    alert("Login dengan Google diklik");
  };

  return (
    <div className={`login-container ${isLeaving ? "fade-out" : "fade-in"}`}>
      <div className="login-card">
        <div className="login-header">
          <h2>Selamat datang kembali!</h2>
          <p>Silakan masukkan detail akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi Anda"
              required
            />
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">
                Ingat saya selama 30 hari
              </label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Lupa kata sandi?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Masuk
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <button className="google-login-button" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Masuk dengan Google
        </button>

        <div className="signup-link">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
