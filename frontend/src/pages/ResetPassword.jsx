import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("email");

    if (email !== savedEmail) {
      alert("Email does not match our records!");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*!]).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      alert(
        "Password must contain:\n• Minimum 6 characters\n• 1 uppercase letter\n• 1 lowercase letter\n• 1 number\n• 1 special character (@#$%^&*!)"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("password", newPassword);
    alert("Password reset successful! Please login with your new password.");
    navigate("/login");
  };

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Reset Your Password</h2>
          <p>Don't worry! Enter your email and create a new password to regain access to your account.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container">
          <h2 className="form-title">Reset Password</h2>

          <form onSubmit={handleReset}>
          
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
            <label>New Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
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
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
          </div>

          <button type="submit" className="signup-btn submit-btn">
            Reset Password
          </button>

          <p className="small-text">
            Remember your password? <a href="/login">Login</a>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
