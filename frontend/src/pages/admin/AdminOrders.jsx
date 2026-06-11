import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <AdminLayout>
      <div className="admin-orders">
        <h1>Orders Management</h1>
        
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>₹{order.total}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;