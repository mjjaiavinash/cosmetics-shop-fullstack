import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";
import ManageAdmin from "./pages/admin/ManageAdmin";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
          <Route path="/admin/manage-admin" element={<ProtectedRoute><ManageAdmin /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;


