# 💄 Cosmetics Management System

A full-stack MERN e-commerce web application for browsing, purchasing, and managing premium beauty products including Skincare, Makeup, Haircare, and Perfume.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, React Router DOM v7 |
| UI Library | Material UI (MUI v7), Emotion, Styled Components |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | Bcrypt (password hashing) |
| HTTP Client | Axios |
| Dev Tools | ESLint, Nodemon |

---

## ✨ Features

### 👤 User Side
- 🏠 Home page with hero section, trending products, categories, customer reviews & newsletter
- 🛍️ Product listing with category filters — Skincare, Makeup, Haircare, Perfume
- 🛒 Add to Cart with quantity management (stored in localStorage)
- ⚡ Buy Now with instant checkout modal
- 📦 Order placement with customer name, phone, address & payment method
- 🔐 User Signup & Login with password hashing
- 🔑 Forgot / Reset Password
- 📬 Contact form submission
- ℹ️ About & Privacy Policy pages

### 🔧 Admin Side
- 🔐 Admin Login (default: `admin` / `admin123` or DB admins)
- 📊 Dashboard with total sales, orders, products, customers, low stock alerts & recent orders
- 📦 Product Management — Add, Edit, Delete products
- 🗂️ Category Management
- 🧾 Order Management — View all orders with status
- 👥 Customer Management — View all registered users
- 🎁 Offers Management
- ⚙️ Admin Settings
- 👨‍💼 Manage Admins — Add, Edit, Delete admin accounts
- 🔒 Protected Routes — Admin pages are secured

---

## 📁 Project Structure

```
myapp/
├── src/                        # React Frontend
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Products.jsx        # Products listing
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Login.jsx           # Login selector
│   │   ├── UserLogin.jsx       # User login
│   │   ├── Signup.jsx          # User registration
│   │   ├── ResetPassword.jsx   # Password reset
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Privacy.jsx         # Privacy policy
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminCategories.jsx
│   │       ├── AdminOrders.jsx
│   │       ├── AdminCustomers.jsx
│   │       ├── AdminOffers.jsx
│   │       ├── AdminSettings.jsx
│   │       └── ManageAdmin.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CheckoutModal.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AdminContext.jsx    # Global state for products, orders, customers
│   ├── api/
│   │   ├── api.js
│   │   ├── adminAuth.js
│   │   └── userAuth.js
│   ├── config/
│   │   └── api.js              # API base URL config
│   ├── App.jsx                 # Routes definition
│   └── main.jsx                # Entry point
│
├── backend/                    # Node.js Backend
│   ├── models/
│   │   ├── User.js             # fullName, email, password, loginHistory
│   │   ├── Admin.js            # username, password
│   │   ├── Product.js          # name, price, category, image, stock, description
│   │   ├── Order.js            # customerName, phone, address, products, totalAmount, status
│   │   └── Contact.js          # name, email, message
│   ├── routes/
│   │   ├── auth.js             # /api/auth — signup, login, forgot-password
│   │   ├── admin.js            # /api/admin — products, customers, orders, admins
│   │   ├── orders.js           # /api — place-order, get orders
│   │   └── contact.js          # /api/contact — contact form
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   └── server.cjs              # Express server entry point
│
├── public/
│   └── images/                 # Product images
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Forgot password |

### Admin — `/api/admin`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/products` | Get all products |
| POST | `/api/admin/products` | Add product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| GET | `/api/admin/customers` | Get all customers |
| GET | `/api/admin/contacts` | Get contact submissions |
| GET | `/api/admin/admins` | Get all admins |
| POST | `/api/admin/admins` | Add new admin |
| PUT | `/api/admin/admins/:id` | Update admin |
| DELETE | `/api/admin/admins/:id` | Delete admin |

### Orders — `/api`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/place-order` | Place new order |
| GET | `/api/orders` | Get all orders |

### Contact — `/api/contact`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v22.12.0+
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cosmetics-management-system.git
cd cosmetics-management-system
```

### 2. Setup Frontend

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 3. Setup Backend

```bash
cd backend
npm install
npm start
```

Backend runs at: `http://localhost:5000`

For development with auto-restart:

```bash
npm run dev
```

---

## 🔑 Environment Variables

### `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SALT_ROUNDS=10
```

### Frontend `.env` (optional)

```env
VITE_API_URL=http://localhost:5000
```

---

## 🗺️ Application Routes

### User Routes
| Route | Page |
|-------|------|
| `/` | Home |
| `/products` | All Products |
| `/cart` | Shopping Cart |
| `/login` | Login Selector |
| `/signup` | User Registration |
| `/reset-password` | Reset Password |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |

### Admin Routes (Protected)
| Route | Page |
|-------|------|
| `/admin/login` | Admin Login |
| `/admin` | Dashboard |
| `/admin/products` | Manage Products |
| `/admin/categories` | Manage Categories |
| `/admin/orders` | Manage Orders |
| `/admin/customers` | View Customers |
| `/admin/manage-admin` | Manage Admins |
| `/admin/settings` | Settings |

---

## 🔐 Default Admin Credentials

```
Username: admin
Password: admin123
```

> ⚠️ Change the default credentials before deploying to production.

---

## 📦 Product Categories

| Category | Examples |
|----------|----------|
| Skincare | Glow Face Cream, Moisturizer |
| Makeup | Liquid Foundation, Mascara |
| Haircare | Shampoo, Hair Conditioner |
| Perfume | Rose Perfume, Luxury Perfume |

---

## 🛠️ Available Scripts

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Backend
```bash
npm start         # Start server (node server.cjs)
npm run dev       # Start with nodemon (auto-restart)
```

---

## 📄 License

© 2025 Cosmetics Store. All Rights Reserved.
