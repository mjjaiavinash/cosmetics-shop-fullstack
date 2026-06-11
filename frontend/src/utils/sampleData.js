export const generateSampleData = () => {
  const sampleCustomers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 9876543210', lastActive: new Date().toISOString() },
    { id: 2, name: 'Rahul Kumar', email: 'rahul@email.com', phone: '+91 9876543211', lastActive: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, name: 'Sneha Patel', email: 'sneha@email.com', phone: '+91 9876543212', lastActive: new Date(Date.now() - 172800000).toISOString() },
    { id: 4, name: 'Arjun Singh', email: 'arjun@email.com', phone: '+91 9876543213', lastActive: new Date(Date.now() - 259200000).toISOString() },
    { id: 5, name: 'Kavya Reddy', email: 'kavya@email.com', phone: '+91 9876543214', lastActive: new Date(Date.now() - 345600000).toISOString() }
  ];

  const sampleOrders = [
    {
      id: 1001,
      customerId: 1,
      customerName: 'Priya Sharma',
      date: new Date().toISOString(),
      items: [
        { id: 1, name: 'Glow Face Cream', price: 599, quantity: 2 },
        { id: 8, name: 'Mascara', price: 399, quantity: 1 }
      ],
      total: 1597,
      status: 'pending'
    },
    {
      id: 1002,
      customerId: 2,
      customerName: 'Rahul Kumar',
      date: new Date(Date.now() - 86400000).toISOString(),
      items: [
        { id: 19, name: 'Rose Perfume', price: 450, quantity: 1 },
        { id: 13, name: 'Shampoo', price: 299, quantity: 2 }
      ],
      total: 1048,
      status: 'processing'
    },
    {
      id: 1003,
      customerId: 3,
      customerName: 'Sneha Patel',
      date: new Date(Date.now() - 172800000).toISOString(),
      items: [
        { id: 7, name: 'Liquid Foundation', price: 299, quantity: 1 },
        { id: 12, name: 'Lipstick', price: 199, quantity: 3 }
      ],
      total: 896,
      status: 'shipped'
    },
    {
      id: 1004,
      customerId: 4,
      customerName: 'Arjun Singh',
      date: new Date(Date.now() - 259200000).toISOString(),
      items: [
        { id: 20, name: 'Luxury Perfume', price: 899, quantity: 1 }
      ],
      total: 899,
      status: 'delivered'
    },
    {
      id: 1005,
      customerId: 5,
      customerName: 'Kavya Reddy',
      date: new Date(Date.now() - 345600000).toISOString(),
      items: [
        { id: 3, name: 'Vitamin C Serum', price: 799, quantity: 1 },
        { id: 6, name: 'Night Cream', price: 699, quantity: 1 }
      ],
      total: 1498,
      status: 'delivered'
    }
  ];

  if (!localStorage.getItem('customers')) {
    localStorage.setItem('customers', JSON.stringify(sampleCustomers));
  }
  
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(sampleOrders));
  }

  return { sampleCustomers, sampleOrders };
};