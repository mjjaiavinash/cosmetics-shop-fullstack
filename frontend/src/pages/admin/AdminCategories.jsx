import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', subcategories: [] });
  const [newSubcategory, setNewSubcategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setFormData({ name: '', subcategories: [] });
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData(category);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const addSubcategory = () => {
    if (newSubcategory.trim()) {
      setFormData({
        ...formData,
        subcategories: [...formData.subcategories, newSubcategory.trim()]
      });
      setNewSubcategory('');
    }
  };

  const removeSubcategory = (index) => {
    setFormData({
      ...formData,
      subcategories: formData.subcategories.filter((_, i) => i !== index)
    });
  };

  return (
    <AdminLayout>
      <div className="admin-categories">
        <h1>Categories Management</h1>
        <button onClick={() => setShowForm(true)} className="add-btn" style={{marginBottom: '30px'}}>
          + Add Category
        </button>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                
                <div className="subcategories-section">
                  <h3>Subcategories</h3>
                  <div className="add-subcategory">
                    <input
                      type="text"
                      placeholder="Add subcategory"
                      value={newSubcategory}
                      onChange={(e) => setNewSubcategory(e.target.value)}
                    />
                    <button type="button" onClick={addSubcategory}>Add</button>
                  </div>
                  
                  <div className="subcategories-list">
                    {formData.subcategories.map((sub, index) => (
                      <div key={index} className="subcategory-item">
                        <span>{sub}</span>
                        <button type="button" onClick={() => removeSubcategory(index)}>×</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingCategory ? 'Update' : 'Add'} Category
                  </button>
                  <button type="button" onClick={() => {
                    setShowForm(false);
                    setEditingCategory(null);
                    setFormData({ name: '', subcategories: [] });
                  }} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <h3>{category.name}</h3>
                <div className="category-actions">
                  <button onClick={() => handleEdit(category)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(category.id)} className="delete-btn">Delete</button>
                </div>
              </div>
              
              <div className="subcategories">
                <h4>Subcategories:</h4>
                <div className="subcategory-tags">
                  {category.subcategories.map((sub, index) => (
                    <span key={index} className="subcategory-tag">{sub}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCategories;