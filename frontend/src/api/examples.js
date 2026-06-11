// Example React component integration with backend APIs
import { userAuth } from './api';

// Example: User Signup
const handleUserSignup = async (formData) => {
  try {
    const result = await userAuth.signup({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      console.log('Signup successful:', result.message);
      // Redirect to login or dashboard
    }
  } catch (error) {
    console.error('Signup failed:', error.message);
    // Show error message to user
  }
};

// Example: User Login
const handleUserLogin = async (credentials) => {
  try {
    const result = await userAuth.login({
      email: credentials.email,
      password: credentials.password
    });
    
    if (result.success) {
      console.log('Login successful:', result.message);
      localStorage.setItem('user', JSON.stringify(result.user));
      // Redirect to dashboard
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    // Show error message to user
  }
};

// Example: Forgot Password
const handleForgotPassword = async (email) => {
  try {
    const result = await userAuth.forgotPassword(email);
    
    if (result.success) {
      console.log('Reset email sent:', result.message);
      // Show success message
    }
  } catch (error) {
    console.error('Reset failed:', error.message);
    // Show error message
  }
};



export { handleUserSignup, handleUserLogin, handleForgotPassword };