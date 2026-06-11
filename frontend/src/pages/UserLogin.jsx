import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("email");
    const savedPass = localStorage.getItem("password");

    if (email === savedEmail && password === savedPass) {
      if (rememberMe) {
        localStorage.setItem("rememberUser", "true");
      }
      alert("User Login Successful!");
      navigate("/");
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Welcome Back!</h2>
          <p>Sign in to your account to continue shopping and manage your orders.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container compact">
          <h2 className="form-title">User Login</h2>

          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
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
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  👁️
                </span>
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            <button type="submit" className="submit-btn login-btn">
              Login
            </button>

            <p className="small-text">
              <a href="/reset-password">Forgot Password?</a>
            </p>

            <p className="small-text">
              New user? <a href="/signup">Sign Up</a>
            </p>

            <p className="small-text">
              <a href="/login">← Back to Login Options</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;