import {  useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
 
const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // 🔍 Validation
    if (!form.username || !form.password) {
      setError("Please enter username and password");
      return;
    }

    // 🔐 Static Auth
    if (form.username === "admin" && form.password === "admin") {
      setSuccess("Login successful! 🚀");
      navigate("/library");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
      <div className="login-container">
        <div className="left">
          <div className="branding">
            <h1><span className="logo">Jio</span>Star | PRISM</h1>
            <p>
              Content moderation platform with the power of modern intelligence.<br />
              Refining automated signals through expert review.
            </p>
          </div>
        </div>

        <div className="right">
          <div className="login-box">
            <form onSubmit={handleSubmit}>
            <h2>Hello Again!</h2>
            <p className="subtitle">Welcome Back</p>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
                </span>
            </div>

            <button className="login-btn" type="submit">Log In</button>

            {/* ERROR */}
            {error && <p className="error">{error}</p>}

            <div className="help">
              <span>Not able to login to your account?</span>
              <a href="#">Need help?</a>
            </div>
            </form>
          </div>

          <div className="footer">
            <div className="footer-logo">Jio<span>Star</span></div>
            <p>Content moderation console - Prism V1.0</p>
          </div>
        </div>
      </div>

  );
}
