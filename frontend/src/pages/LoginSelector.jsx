import { Link } from "react-router-dom";

function LoginSelector() {
  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Welcome Back!</h2>
          <p>Choose your login type to access your account or manage the store.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container">
          <h2 className="form-title">Select Login Type</h2>
          
          <div className="login-options">
            <Link to="/user-login" className="login-option user-login">
              <div className="option-icon">👤</div>
              <h3>User Login</h3>
              <p>Access your account to shop and manage orders</p>
            </Link>
            

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSelector;