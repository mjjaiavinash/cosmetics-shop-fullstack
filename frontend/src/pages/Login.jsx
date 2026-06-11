import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../api/userAuth";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await userAuth.login({ email, password });
      
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your beauty collection and discover amazing products.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container compact">
          <h2 className="form-title">Login</h2>

          <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <button type="submit" className="submit-btn login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div style={{color: '#e74c3c', fontSize: '14px', marginTop: '10px', textAlign: 'center'}}>
              {error}
            </div>
          )}

          <p className="small-text">
            <a href="/reset-password">Forgot Password?</a>
          </p>

          <p className="small-text">
            New user? <a href="/signup">Sign Up</a>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
