import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../api/userAuth";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // VALIDATION
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*!]).{6,}$/;

    if (!fullName.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Enter a valid email address");
      setLoading(false);
      return;
    }

    if (!passwordPattern.test(password)) {
      setError("Password must contain: 6+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await userAuth.signup({ fullName, email, password });
      
      if (result.success) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Join Our Beauty Community!</h2>
          <p>Create your account and start your journey to discover premium beauty products.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container">
          <h2 className="form-title">Create Account</h2>

          <form onSubmit={handleSignup}>
          
          <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <button type="submit" className="signup-btn submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {error && (
            <div style={{color: '#e74c3c', fontSize: '14px', marginTop: '10px', textAlign: 'center'}}>
              {error}
            </div>
          )}

          <p className="small-text">
            Already have an account? <a href="/login">Login</a>
          </p>

        </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

