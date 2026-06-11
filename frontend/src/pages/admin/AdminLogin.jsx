import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminAuth } from '../../api/adminAuth';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await adminAuth.login(credentials);
      if (result.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin');
      }
    } catch (error) {
      alert(error.message || 'Login failed');
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-side-image">
        <div className="auth-side-content">
          <h2>Admin Portal ⚡</h2>
          <p>Manage your cosmetics store with powerful admin tools and analytics.</p>
        </div>
      </div>
      
      <div className="auth-form-side">
        <div className="form-container">
          <h2 className="form-title">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
            <button type="submit" className="login-btn">Login to Admin</button>
          </form>
          <div className="small-text">
            <Link to="/">← Back to Store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;