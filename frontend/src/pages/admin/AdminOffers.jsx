import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminOffers() {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', discountType: 'percentage', discountValue: '', 
    minAmount: '', maxDiscount: '', code: '', startDate: '', endDate: '', active: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const offerData = {
      ...formData,
      discountValue: parseFloat(formData.discountValue),
      minAmount: parseFloat(formData.minAmount) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0
    };

    if (editingOffer) {
      updateOffer(editingOffer.id, offerData);
    } else {
      addOffer(offerData);
    }

    setFormData({
      title: '', description: '', discountType: 'percentage', discountValue: '', 
      minAmount: '', maxDiscount: '', code: '', startDate: '', endDate: '', active: true
    });
    setShowForm(false);
    setEditingOffer(null);
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      deleteOffer(id);
    }
  };

  const toggleOfferStatus = (offer) => {
    updateOffer(offer.id, { ...offer, active: !offer.active });
  };

  return (
    <AdminLayout>
      <div className="admin-offers">
        <div className="page-header">
          <h1>Offers & Discounts</h1>
          <button onClick={() => setShowForm(true)} className="add-btn">
            + Create Offer
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal large">
              <h2>{editingOffer ? 'Edit Offer' : 'Create New Offer'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Offer Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    required
                  />
                </div>

                <textarea
                  placeholder="Offer Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />

                <div className="form-row">
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                  <input
                    type="number"
                    placeholder={formData.discountType === 'percentage' ? 'Discount %' : 'Discount Amount'}
                    value={formData.discountValue}
                    onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <input
                    type="number"
                    placeholder="Minimum Order Amount"
                    value={formData.minAmount}
                    onChange={(e) => setFormData({...formData, minAmount: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Maximum Discount"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingOffer ? 'Update' : 'Create'} Offer
                  </button>
                  <button type="button" onClick={() => {
                    setShowForm(false);
                    setEditingOffer(null);
                    setFormData({
                      title: '', description: '', discountType: 'percentage', discountValue: '', 
                      minAmount: '', maxDiscount: '', code: '', startDate: '', endDate: '', active: true
                    });
                  }} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className={`offer-card ${offer.active ? 'active' : 'inactive'}`}>
              <div className="offer-header">
                <h3>{offer.title}</h3>
                <div className="offer-actions">
                  <button 
                    onClick={() => toggleOfferStatus(offer)} 
                    className={`toggle-btn ${offer.active ? 'active' : 'inactive'}`}
                  >
                    {offer.active ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => handleEdit(offer)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(offer.id)} className="delete-btn">Delete</button>
                </div>
              </div>
              
              <div className="offer-details">
                <p className="offer-code">Code: <strong>{offer.code}</strong></p>
                <p className="offer-discount">
                  {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`}
                </p>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-conditions">
                  {offer.minAmount > 0 && <span>Min: ₹{offer.minAmount}</span>}
                  {offer.maxDiscount > 0 && <span>Max: ₹{offer.maxDiscount}</span>}
                </div>
                <div className="offer-dates">
                  <span>Valid: {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOffers;