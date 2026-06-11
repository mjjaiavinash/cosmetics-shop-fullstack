import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminSettings() {
  const { settings, updateSettings } = useAdmin();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Settings updated successfully!');
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <AdminLayout>
      <div className="admin-settings">
        <h1>Settings</h1>
        
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <h2>Store Information</h2>
            
            <div className="form-group">
              <label>Store Name</label>
              <input
                type="text"
                value={formData.storeName || ''}
                onChange={(e) => handleChange('storeName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Store Description</label>
              <textarea
                value={formData.storeDescription || ''}
                onChange={(e) => handleChange('storeDescription', e.target.value)}
                placeholder="Brief description of your store"
              />
            </div>

            <div className="form-group">
              <label>Store Email</label>
              <input
                type="email"
                value={formData.storeEmail || ''}
                onChange={(e) => handleChange('storeEmail', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Store Phone</label>
              <input
                type="tel"
                value={formData.storePhone || ''}
                onChange={(e) => handleChange('storePhone', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Currency & Pricing</h2>
            
            <div className="form-group">
              <label>Currency Symbol</label>
              <input
                type="text"
                value={formData.currency || '₹'}
                onChange={(e) => handleChange('currency', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input
                type="number"
                value={formData.taxRate || 0}
                onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Shipping Fee</label>
              <input
                type="number"
                value={formData.shippingFee || 0}
                onChange={(e) => handleChange('shippingFee', parseFloat(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Free Shipping Minimum</label>
              <input
                type="number"
                value={formData.freeShippingMin || 0}
                onChange={(e) => handleChange('freeShippingMin', parseFloat(e.target.value))}
                placeholder="Minimum order for free shipping"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Notifications</h2>
            
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.emailNotifications || false}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                />
                Email Notifications for New Orders
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.lowStockAlerts || false}
                  onChange={(e) => handleChange('lowStockAlerts', e.target.checked)}
                />
                Low Stock Alerts
              </label>
            </div>

            <div className="form-group">
              <label>Low Stock Threshold</label>
              <input
                type="number"
                value={formData.lowStockThreshold || 10}
                onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Admin Preferences</h2>
            
            <div className="form-group">
              <label>Items Per Page</label>
              <select
                value={formData.itemsPerPage || 20}
                onChange={(e) => handleChange('itemsPerPage', parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="form-group">
              <label>Default Order Status</label>
              <select
                value={formData.defaultOrderStatus || 'pending'}
                onChange={(e) => handleChange('defaultOrderStatus', e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Settings</button>
            <button type="button" onClick={() => setFormData(settings)} className="reset-btn">
              Reset Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminSettings;