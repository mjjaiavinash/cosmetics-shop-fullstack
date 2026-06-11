import { useState, useEffect } from 'react';
import { adminAuth } from '../../api/adminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const result = await adminAuth.getAdmins();
      if (result.success) {
        setAdmins(result.admins);
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await adminAuth.addAdmin(newAdmin);
      if (result.success) {
        alert('Admin added successfully!');
        setNewAdmin({ username: '', password: '' });
        setShowForm(false);
        fetchAdmins();
      } else {
        alert(result.message || 'Failed to add admin');
      }
    } catch (error) {
      console.error('Add admin error:', error);
      alert(error.message || 'Network error - make sure backend is running');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    if (!editingAdmin.username) {
      alert('Username is required');
      return;
    }

    setLoading(true);
    try {
      const result = await adminAuth.updateAdmin(editingAdmin._id, editingAdmin);
      if (result.success) {
        alert('Admin updated successfully!');
        setEditingAdmin(null);
        fetchAdmins();
      } else {
        alert(result.message || 'Failed to update admin');
      }
    } catch (error) {
      console.error('Update admin error:', error);
      alert(error.message || 'Failed to update admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;
    
    try {
      const result = await adminAuth.deleteAdmin(id);
      if (result.success) {
        alert('Admin deleted successfully!');
        fetchAdmins();
      }
    } catch (error) {
      alert(error.message || 'Failed to delete admin');
    }
  };

  const startEdit = (admin) => {
    setEditingAdmin({ ...admin, password: '' });
  };

  const cancelEdit = () => {
    setEditingAdmin(null);
  };

  return (
    <AdminLayout>
      <div className="manage-admin">
        <h1>Manage Admins</h1>
        
        <h1>Admin Management</h1>
        <button onClick={() => setShowForm(true)} className="add-btn" style={{marginBottom: '30px'}}>
          + Add Admin
        </button>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Admin</h2>
              <form onSubmit={handleAddAdmin}>
                <input
                  type="text"
                  placeholder="Username"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  required
                />
                <div className="form-actions">
                  <button type="submit" disabled={loading} className="save-btn">
                    {loading ? 'Adding...' : 'Add Admin'}
                  </button>
                  <button type="button" onClick={() => {
                    setShowForm(false);
                    setNewAdmin({ username: '', password: '' });
                  }} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingAdmin && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Admin</h2>
              <form onSubmit={handleEditAdmin}>
                <input
                  type="text"
                  placeholder="Username"
                  value={editingAdmin.username}
                  onChange={(e) => setEditingAdmin({...editingAdmin, username: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="New Password (leave empty to keep current)"
                  value={editingAdmin.password}
                  onChange={(e) => setEditingAdmin({...editingAdmin, password: e.target.value})}
                />
                <div className="form-actions">
                  <button type="submit" disabled={loading} className="save-btn">
                    {loading ? 'Updating...' : 'Update Admin'}
                  </button>
                  <button type="button" onClick={cancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Username</th>
                <th>Created At</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No admins found</td>
                </tr>
              ) : (
                admins.map(admin => (
                  <tr key={admin._id}>
                    <td style={{padding: '8px', textAlign: 'center'}}>
                      <span style={{
                        fontSize: '24px',
                        display: 'block',
                        margin: '0 auto'
                      }}>👤</span>
                    </td>
                    <td style={{padding: '8px'}}>{admin.username}</td>
                    <td style={{padding: '8px'}}>{new Date(admin.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</td>
                    <td style={{padding: '8px'}}>
                      {admin.updatedAt !== admin.createdAt 
                        ? new Date(admin.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Never'
                      }
                    </td>
                    <td style={{padding: '8px'}}>
                      <button onClick={() => startEdit(admin)} className="edit-btn" style={{marginRight: '5px'}}>Edit</button>
                      <button onClick={() => handleDeleteAdmin(admin._id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="default-admin-info">
          <h3>ℹ️ Default Admin</h3>
          <p>Username: <strong>admin</strong></p>
          <p>Password: <strong>admin123</strong></p>
          <p className="note">This is a hardcoded admin that cannot be edited or deleted.</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageAdmin;