import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', image: '', stock: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    if (editingProduct) {
      updateProduct(editingProduct._id, productData);
    } else {
      addProduct(productData);
    }

    setFormData({ name: '', price: '', category: '', image: '', stock: '', description: '' });
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-products">
        <h1>Products Management</h1>
        <button onClick={() => setShowForm(true)} className="add-btn" style={{marginBottom: '30px'}}>
          + Add Product
        </button>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name.toLowerCase()}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Image URL (e.g., images/product.jpg)"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                />
                <small style={{color: '#666', fontSize: '12px'}}>Use: images/face-cream.webp, images/lipstick.jpg, etc.</small>
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  <button type="button" onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                    setFormData({ name: '', price: '', category: '', image: '', stock: '', description: '' });
                  }} className="cancel-btn">
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
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No products found</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product._id || product.id}>
                    <td style={{padding: '8px', textAlign: 'center'}}>
                      <img 
                        src={product.image.startsWith('http') ? product.image : `/${product.image}`} 
                        alt={product.name} 
                        onError={(e) => e.target.src = '/images/placeholder.jpg'}
                        style={{
                          width: '50px', 
                          height: '50px', 
                          objectFit: 'cover', 
                          borderRadius: '4px',
                          display: 'block',
                          margin: '0 auto'
                        }}
                      />
                    </td>
                    <td style={{padding: '8px'}}>{product.name}</td>
                    <td style={{padding: '8px'}}>{product.category}</td>
                    <td style={{padding: '8px'}}>₹{product.price}</td>
                    <td style={{padding: '8px'}} className={product.stock < 10 ? 'low-stock' : ''}>{product.stock || 0}</td>
                    <td style={{padding: '8px'}}>
                      <button onClick={() => handleEdit(product)} className="edit-btn" style={{marginRight: '5px'}}>Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
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

export default AdminProducts;