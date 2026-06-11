import { createContext, useContext, useState, useEffect } from 'react';
import { adminAuth } from '../api/adminAuth';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // Set categories immediately
    setCategories([
      { id: 1, name: 'Skincare', subcategories: ['Face Cream', 'Serum', 'Moisturizer', 'Sunscreen'] },
      { id: 2, name: 'Makeup', subcategories: ['Foundation', 'Mascara', 'Lipstick', 'Eyeliner'] },
      { id: 3, name: 'Haircare', subcategories: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'] },
      { id: 4, name: 'Perfume', subcategories: ['Floral', 'Citrus', 'Woody', 'Fresh'] }
    ]);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, customersRes] = await Promise.all([
        adminAuth.getProducts(),
        adminAuth.getCustomers()
      ]);
      
      setProducts(productsRes.products || []);
      setCustomers(customersRes.customers || []);
      
      // Set categories
      setCategories([
        { id: 1, name: 'Skincare', subcategories: ['Face Cream', 'Serum', 'Moisturizer', 'Sunscreen'] },
        { id: 2, name: 'Makeup', subcategories: ['Foundation', 'Mascara', 'Lipstick', 'Eyeliner'] },
        { id: 3, name: 'Haircare', subcategories: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'] },
        { id: 4, name: 'Perfume', subcategories: ['Floral', 'Citrus', 'Woody', 'Fresh'] }
      ]);
      
      // Remove orders - set empty array
      setOrders([]);
      setOffers([]);
      setSettings({
        storeName: 'Cosmetics Store',
        currency: '₹',
        taxRate: 18,
        shippingFee: 50
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const addProduct = async (product) => {
    try {
      const result = await adminAuth.addProduct(product);
      if (result.success) {
        setProducts(prevProducts => [...prevProducts, result.product]);
        alert('Product added successfully!');
      } else {
        alert('Failed to add product: ' + result.message);
      }
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Error adding product. Make sure backend server is running.');
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const result = await adminAuth.updateProduct(id, updatedProduct);
      if (result.success) {
        setProducts(prevProducts => prevProducts.map(p => p._id === id ? result.product : p));
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await adminAuth.deleteProduct(id);
      if (result.success) {
        setProducts(prevProducts => prevProducts.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const addCategory = (category) => {
    const newCategory = { ...category, id: Date.now() };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const updateCategory = (id, updatedCategory) => {
    const updatedCategories = categories.map(c => c.id === id ? { ...c, ...updatedCategory } : c);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const updateOrderStatus = (id, status) => {
    const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const addOffer = (offer) => {
    const newOffer = { ...offer, id: Date.now() };
    const updatedOffers = [...offers, newOffer];
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

  const updateOffer = (id, updatedOffer) => {
    const updatedOffers = offers.map(o => o.id === id ? { ...o, ...updatedOffer } : o);
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

  const deleteOffer = (id) => {
    const updatedOffers = offers.filter(o => o.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));
  };

  const value = {
    products, addProduct, updateProduct, deleteProduct,
    categories, addCategory, updateCategory, deleteCategory,
    orders, updateOrderStatus,
    customers,
    offers, addOffer, updateOffer, deleteOffer,
    settings, updateSettings
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};