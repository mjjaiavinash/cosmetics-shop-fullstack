import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminDashboard() {
  const { products, orders, customers, offers } = useAdmin();

  const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const lowStockProducts = products.filter(p => (p.stock || 0) < 10);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Dashboard</h1>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">₹{totalSales.toLocaleString()}</p>
          </div>
          
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{orders.length}</p>
          </div>
          
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{products.length}</p>
          </div>
          
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p className="stat-value">{customers.length}</p>
          </div>
        </div>

        <div className="dashboard-alerts">
          <div className="alert-section">
            <h3>⚠️ Low Stock Alerts</h3>
            {lowStockProducts.length > 0 ? (
              <div className="alert-list">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="alert-item">
                    {product.name} - Stock: {product.stock || 0}
                  </div>
                ))}
              </div>
            ) : (
              <p>All products are well stocked!</p>
            )}
          </div>

          <div className="alert-section">
            <h3>📋 Pending Orders</h3>
            <p>{pendingOrders} orders awaiting processing</p>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Orders</h3>
          <div className="activity-list">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="activity-item">
                <span>Order #{order.id}</span>
                <span>₹{order.total}</span>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;