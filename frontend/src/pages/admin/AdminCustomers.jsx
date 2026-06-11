import { useState, useEffect } from 'react';
import { adminAuth } from '../../api/adminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const result = await adminAuth.getCustomers();
      if (result.success) {
        setCustomers(result.customers || []);
      } else {
        setError('Failed to load customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Network error - make sure backend is running');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-customers">
          <h1>Customers Management</h1>
          <div style={{textAlign: 'center', padding: '50px'}}>
            <p>Loading customers...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-customers">
          <h1>Customers Management</h1>
          <div style={{textAlign: 'center', padding: '50px', color: '#e74c3c'}}>
            <p>{error}</p>
            <button onClick={fetchCustomers} className="add-btn">Retry</button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-customers">
        <h1>Customers Management</h1>
        
        <div className="customers-stats">
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p className="stat-value">{customers.length}</p>
          </div>
          <div className="stat-card">
            <h3>Registered Users</h3>
            <p className="stat-value">{customers.filter(c => c.email).length}</p>
          </div>
        </div>

        <div className="customers-table">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                    No customers found. Customers will appear here when they register.
                  </td>
                </tr>
              ) : (
                customers.map(customer => (
                  <tr key={customer._id || customer.id}>
                    <td>#{customer._id || customer.id}</td>
                    <td>{customer.fullName || customer.name || 'N/A'}</td>
                    <td>{customer.email || 'N/A'}</td>
                    <td>{customer.phone || 'N/A'}</td>
                    <td>0</td>
                    <td>₹0</td>
                    <td>{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}</td>
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

export default AdminCustomers;