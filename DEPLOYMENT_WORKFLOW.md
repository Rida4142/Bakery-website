# Bakery Website - Complete Deployment & Workflow Guide

## 🎯 High-Level Workflow

```
User Flow:
1. [Customer] Visits website → Home Page + Hero Section
2. [Customer] Clicks "Browse Menu" → Menu Page with Categories
3. [Customer] Selects Category → Filters products by category
4. [Customer] Views Products → Shows available items with prices/sizes
5. [Customer] Clicks Product → Size/price selection modal
6. [Customer] Adds to Cart → Cart updates (persists to localStorage)
7. [Customer] Views Cart → See items, total, payment method options
8. [Customer] Enters Info → Name, Phone, Email, Address (if delivery)
9. [Customer] Selects Delivery/Pickup → Shows delivery fee calculation
10. [Customer] Places Order → API call to backend createOrder
11. [Backend] Validates → Checks products exist, calculates server-side total
12. [Backend] Generates → Unique order number (ORD-{timestamp}-{random})
13. [Backend] Sends WhatsApp → Pre-filled message via WhatsApp API
14. [Frontend] Displays Confirmation → Shows order number + WhatsApp link
15. [Customer] Tracks Order → Can use order number to check status
16. [Admin] Manages Orders → Can view, update status, mark delivered/cancelled
```

## 📦 Architecture

### Backend (Express + MongoDB)
- **Port:** 5000
- **Database:** MongoDB Atlas (Cloud)
- **API Prefix:** `/api`

**Key Routes:**
- `GET /api/categories` - List active categories
- `GET /api/products?category={name}` - List products by category
- `POST /api/orders` - Create new order (checkout)
- `GET /api/orders/track/{orderNumber}` - Track order by number
- `GET /api/admin/orders` - Admin: list all orders
- `PATCH /api/orders/{id}/status` - Admin: update order status

### Frontend (React + Vite)
- **Port:** 5173 (default dev server)
- **Build Tool:** Vite
- **CSS:** Tailwind CSS
- **State Management:** React Context (CartContext)
- **HTTP Client:** Axios

**Key Pages:**
- `/` - Home page
- `/menu` - Product menu with categories
- `/cart` - Shopping cart + checkout
- `/track-order` - Order tracking by number
- `/admin` - Admin dashboard (requires login)

---

## 🚀 Startup Instructions (Development)

### Prerequisites
- Node.js 18+ installed
- MongoDB connection string ready (already configured)
- Backend and Frontend on same machine OR exposed URLs configured

### Step 1: Seed Database (One-time)

Navigate to Backend directory and run seed script:

```bash
cd Backend
node seed.js
```

**What it does:**
- Creates Bakery document with phone/WhatsApp number
- Creates 11 categories (Pizza, Specials, Burgers, etc.)
- Creates 40+ products with sizes/prices
- Sets product availability to `true` by default
- Checks if database already seeded (prevents duplicates)

**Expected output:**
```
Created bakery: Super Ideal Bakers [ID]
Created 11 categories
Created 40 products
Seed complete.
```

**Troubleshooting:**
- If you see "This database already contains a bakery" → Database is already seeded. Skip this step.
- If connection fails → Check `Backend/.env` has valid `MONGO_URI`

### Step 2: Start Backend

In one terminal, from `Backend` directory:

```bash
npm install  # (if not already done)
npm start
# or
node server.js
```

**Expected output:**
```
Server is running on port 5000
Connected to MongoDB
```

**Verify it's running:**
```bash
curl http://localhost:5000/api/products
# Should return array of products (JSON)
```

### Step 3: Start Frontend (in another terminal)

From `Frontend` directory:

```bash
npm install  # (if not already done)
npm run dev
```

**Expected output:**
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

**Browser:**
- Open `http://localhost:5173`
- Menu items should load
- Can add items to cart
- Checkout should work

---

## 🔍 Troubleshooting: Menu Not Loading

**Symptom:** Menu page shows "Failed to load products" error

**Diagnosis Steps:**

1. **Check backend is running:**
   ```bash
   curl http://localhost:5000/api/products
   ```
   If connection refused → Backend not running (go to Step 2 above)

2. **Check database is seeded:**
   ```bash
   # Look at MongoDB Atlas dashboard or use MongoDB client:
   db.products.count()  # Should show ~40+
   ```
   If 0 products → Run seed script (Step 1 above)

3. **Check categories exist:**
   ```bash
   curl http://localhost:5000/api/categories
   ```
   Should return array of categories with names like "Pizza", "Burgers", etc.

4. **Check browser console (F12 → Console tab):**
   - Look for network errors
   - Check if API URL is correct (should be `http://localhost:5000/api`)
   - Network tab shows failed requests? Click request → Response tab to see error

5. **Check .env files:**
   - **Backend:** `Backend/.env` should have `MONGO_URI=mongodb+srv://...`
   - **Frontend:** `Frontend/.env` should have `VITE_API_URL=http://localhost:5000/api`

---

## 🛒 Troubleshooting: Checkout Not Proceeding

**Symptom:** After clicking "Place Order", nothing happens OR error appears

**Diagnosis Steps:**

1. **Check browser console (F12 → Console tab):**
   - Any red error messages? Copy the full error text
   - Network tab → look for failed POST to `/api/orders`
   - Click the request → Response tab to see server error message

2. **Check backend is accessible:**
   ```bash
   curl -X POST http://localhost:5000/api/orders \
     -H "Content-Type: application/json" \
     -d '{
       "customerName": "Test",
       "phone": "03001234567",
       "items": [{"productId": "000000000000000000000001", "size": null, "quantity": 1}],
       "orderType": "pickup",
       "deliveryDistance": 0,
       "deliveryFee": 0
     }'
   ```
   Should return order confirmation (not error)

3. **Common errors & solutions:**

   | Error | Cause | Solution |
   |-------|-------|----------|
   | "Cannot find product" | Invalid productId sent | Check cart items have correct product IDs |
   | "Bakery not found" | Bakery config missing | Run seed script to create bakery |
   | "Network Error" | Backend not running | Start backend (Step 2) |
   | "CORS error" | Backend CORS not allowing requests | Check backend server.js has CORS middleware |
   | "Failed to load products" (before checkout) | Database empty | Run seed script |

4. **Verify cart items have correct IDs:**
   - Open browser console: `localStorage.getItem('cart')` 
   - Check each item has `id` field (not `productId` or `_id`)

---

## 📊 Admin Dashboard

**Access:** `http://localhost:5173/admin`

**Login:** (first-time admin account needs to be created manually)

**Features:**
- View all orders
- Filter orders by status
- Update order status
- View revenue/sales charts
- Manage products and categories

---

## 📱 API Endpoints Reference

### Products & Categories (Public)

```
GET /api/categories
→ Returns array of active categories

GET /api/products
→ Returns array of available products

GET /api/products?category=Pizza
→ Returns products in Pizza category

GET /api/products/:id
→ Returns single product by ID
```

### Orders (Public)

```
POST /api/orders
Body: {
  "customerName": "John",
  "phone": "03001234567",
  "email": "john@example.com",
  "address": "123 Main St", // required if delivery
  "notes": "Extra cheese",
  "items": [
    {
      "productId": "...mongoId...",
      "size": "M",  // null if no sizes
      "quantity": 2
    }
  ],
  "orderType": "pickup" | "delivery",
  "deliveryDistance": 5,  // km, 0 if pickup
  "deliveryFee": 250       // calculated server-side
}
→ Returns: { orderNumber, whatsappLink, totalAmount }

GET /api/orders/track/:orderNumber
→ Returns full order details with current status
```

### Orders (Admin - requires JWT token)

```
GET /api/admin/orders
→ Returns all orders (paginated)

GET /api/admin/orders/:id
→ Returns single order

PATCH /api/admin/orders/:id/status
Body: { "status": "Delivered" | "Cancelled" | "Preparing" | ... }
→ Updates order status
```

---

## 🔐 Environment Configuration

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://bakery_admin:bakery123@bakery-project.9dxssvc.mongodb.net/super-ideal?retryWrites=true&w=majority&appName=Bakery-Project
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api  # for development
# For production, use your deployed backend URL
```

---

## 🌐 Production Deployment Checklist

### Backend (Node.js + Express)
- [ ] Deploy to cloud hosting (Heroku, Railway, Render, AWS, etc.)
- [ ] Set environment variables (MONGO_URI, JWT_SECRET, PORT)
- [ ] Ensure MongoDB connection accessible from production
- [ ] Update CORS to allow frontend domain
- [ ] Test API endpoints from production URL
- [ ] Set up monitoring/logging

### Frontend (React + Vite)
- [ ] Build: `npm run build` (creates `dist/` folder)
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Deploy `dist/` folder to hosting (Netlify, Vercel, AWS S3 + CloudFront, etc.)
- [ ] Test all pages and checkout flow
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure domain name

### Database (MongoDB)
- [ ] Run seed script on production database (one-time)
- [ ] Set up backups
- [ ] Configure IP whitelist for production backend server
- [ ] Monitor database usage

### Post-Deployment
- [ ] Test end-to-end order creation → WhatsApp message
- [ ] Verify order tracking works
- [ ] Test admin dashboard
- [ ] Monitor logs for errors
- [ ] Set up alerts for API failures

---

## 📝 Order Status Lifecycle

```
Pending
  ↓ (Admin confirms)
Confirmed
  ↓ (Kitchen starts)
Preparing
  ↓ (Ready for delivery/pickup)
Out For Delivery (or Ready for Pickup)
  ↓ (Customer receives)
Delivered
  ✓ (Complete)

Or at any stage:
Cancelled ✗
```

---

## 📞 WhatsApp Integration

When an order is placed:
1. Backend generates unique order number
2. Backend creates pre-filled WhatsApp message with:
   - Customer name
   - Order number
   - Items list
   - Total amount
   - Delivery address (if applicable)
3. Frontend opens: `https://wa.me/{BAKERY_WHATSAPP_NUMBER}?text={encoded_message}`
4. Customer's WhatsApp app opens with pre-filled message
5. Customer sends to bakery

**WhatsApp Number:** Currently set to `923339440084` (configured in seed.js)

---

## 🎨 Frontend Features

- **Responsive Design:** Mobile, tablet, desktop
- **Category Filtering:** Browse by Pizza, Burger, Shawarma, etc.
- **Product Sizes:** Supports variable pricing (S/M/L/XL or custom sizes)
- **Shopping Cart:** Persists to localStorage
- **Order Tracking:** Real-time status updates
- **Admin Dashboard:** Orders management, charts, analytics
- **WhatsApp Integration:** Direct order confirmation to bakery

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Products showing 0 results | Run seed script: `node Backend/seed.js` |
| Menu page shows error | Check backend running: `curl http://localhost:5000/api/products` |
| Checkout fails with "Cannot find product" | Ensure cart items have correct `id` field |
| CORS error on frontend | Check backend has `app.use(cors())` and CORS is configured |
| API calls show `undefined` base URL | Check `.env` has `VITE_API_URL` set correctly |
| WhatsApp link doesn't open | Check bakery has valid `whatsappNumber` (seed.js) |

---

## 📚 Project Structure

```
d:/Bakeryy/Bakery-website/
├── Backend/
│   ├── .env                  # Environment config
│   ├── server.js             # Express app entry
│   ├── seed.js               # Database seeding script
│   ├── config/db.js          # MongoDB connection
│   ├── routes/               # API endpoints
│   │   ├── auth.js           # Authentication
│   │   ├── menu.js           # Products/categories
│   │   └── orders.js         # Order endpoints
│   ├── controllers/          # Business logic
│   ├── models/               # MongoDB schemas
│   ├── middleware/           # Auth, CORS, etc.
│   └── utils/                # Helpers (generateOrderNumber, WhatsApp message)
├── Frontend/
│   ├── .env                  # API URL config
│   ├── index.html            # Entry HTML
│   ├── src/
│   │   ├── main.jsx          # App entry
│   │   ├── App.jsx           # Router setup
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx      # Browse menu
│   │   │   ├── Cart.jsx      # Checkout
│   │   │   ├── TrackOrder.jsx
│   │   │   └── Admin.jsx
│   │   ├── components/       # Reusable components
│   │   ├── context/          # CartContext state
│   │   ├── services/api.js   # Axios HTTP client
│   │   └── hooks/            # Custom hooks
│   └── package.json
└── DEPLOYMENT_WORKFLOW.md    # This file
```

---

## ✅ Quick Start (Summary)

```bash
# 1. Seed database (one-time)
cd Backend
node seed.js

# 2. Start backend
npm start

# 3. Start frontend (new terminal)
cd Frontend
npm run dev

# 4. Open browser to http://localhost:5173
# ✓ Menu loads
# ✓ Can add to cart
# ✓ Can checkout
```

---

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** Production Ready
