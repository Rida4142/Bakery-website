# 🚀 Quick Start - 5 Minutes to Working Website

## ⚡ Fastest Way (Windows)

Double-click: `START.bat`

**That's it!** Both servers start automatically with database seeding.

---

## ⚡ Fastest Way (macOS/Linux)

```bash
chmod +x start.sh
./start.sh
```

---

## 📋 Manual Steps (if script doesn't work)

### Terminal 1: Backend

```bash
cd Backend
npm install
node seed.js
npm start
```

**Expected output:**
```
Connected to MongoDB
Server is running on port 5000
Created bakery: Super Ideal Bakers
Created 11 categories
Created 40 products
Seed complete.
```

### Terminal 2: Frontend

```bash
cd Frontend
npm install
npm run dev
```

**Expected output:**
```
  VITE v5.0.0 ready in 234 ms

  ➜  Local:   http://localhost:5173/
```

### Open Browser

```
http://localhost:5173
```

---

## ✅ Verification Checklist

- [ ] Backend terminal shows "Server is running on port 5000"
- [ ] Backend shows seed complete with category/product count
- [ ] Frontend terminal shows "VITE ... ready"
- [ ] Browser opens to http://localhost:5173
- [ ] **Menu Page:** Click "Browse Menu" → products load
- [ ] **Add to Cart:** Click a product → can select size → add to cart
- [ ] **Checkout:** Go to Cart → enter name/phone → "Place Order" works
- [ ] **Order Confirmation:** Shows order number + WhatsApp link

---

## 🔍 If Menu Doesn't Load

**Symptom:** "Failed to load products" message

**Quick Fix:**

1. Check Backend is running:
   ```bash
   curl http://localhost:5000/api/products
   ```
   - If fails → restart Backend
   - If works → Frontend config issue

2. Check Backend `.env` has MongoDB URI:
   ```bash
   cat Backend/.env
   ```
   Should show: `MONGO_URI=mongodb+srv://...`

3. Check Frontend `.env`:
   ```bash
   cat Frontend/.env
   ```
   Should show: `VITE_API_URL=http://localhost:5000/api`

4. Open browser DevTools (F12) → Console tab
   - Any red errors? Copy them → search error message in DEPLOYMENT_WORKFLOW.md

---

## 🛒 If Checkout Doesn't Work

**Symptom:** Click "Place Order" → nothing happens

**Quick Fix:**

1. Open browser DevTools (F12) → Network tab
2. Click "Place Order"
3. Look for red request to `/api/orders`
4. Click it → Response tab → read error message

**Common error: "Cannot find product"**
- Solution: Database might not be seeded. Run: `cd Backend && node seed.js`

**Common error: "Network Error"**
- Solution: Backend not running. Start backend in Terminal 1

---

## 📱 Testing the Full Flow

1. **Browse Menu:**
   - Homepage → "Browse Menu"
   - Select category (Pizza, Burgers, etc.)
   - Should show 3-10 items per category

2. **Add to Cart:**
   - Click on product
   - If product has sizes (Pizza, Cakes): select size
   - Enter quantity (default 1)
   - Click "Add to Cart"
   - Navbar cart count increases

3. **Checkout:**
   - Click cart icon → "View Cart"
   - Enter customer info:
     - Name: "John Doe"
     - Phone: "03001234567"
     - Email: "john@example.com" (optional)
   - Select "Pickup" or "Delivery"
   - If Delivery: enter address + distance (km)
   - Click "Place Order"

4. **Order Confirmation:**
   - Should show: "Order placed successfully!"
   - Shows order number: "ORD-{timestamp}-{random}"
   - Shows total amount
   - "Open WhatsApp" button opens chat with bakery

5. **Track Order:**
   - Homepage → "Track Order"
   - Enter order number from confirmation
   - Shows current status (Pending → Confirmed → Preparing → Delivered)
   - Shows items, total, delivery address

---

## 🎯 Admin Dashboard (Optional)

1. **Navigate to:** `http://localhost:5173/admin`
2. **Login:** (needs first admin account - see DEPLOYMENT_WORKFLOW.md)
3. **View Orders:** See all customer orders
4. **Update Status:** Change order status to track progress
5. **View Charts:** Revenue, top products, recent orders

---

## 📊 Architecture at a Glance

```
Frontend (React + Vite)           Backend (Node.js + Express)
Port 5173 ←→ Axios ←→ Port 5000
   ↓                                    ↓
localStorage (Cart)            MongoDB Atlas (Cloud)
   ↓                                    ↓
Router v7 (Pages)              REST API (/api/...)
   ↓                                    ↓
TailwindCSS (Styling)          JWT Auth + CORS
```

**Data Flow:**
1. User clicks product → React stores in CartContext
2. User clicks "Place Order" → Frontend calls POST /api/orders
3. Backend validates products → calculates total server-side
4. Backend generates order number → sends WhatsApp message
5. Backend returns orderNumber + whatsappLink
6. Frontend displays confirmation → opens WhatsApp

---

## 🧹 Cleanup

**Stop servers:**
- Press `Ctrl+C` in each terminal

**Clear cart:**
- Browser DevTools → Application → LocalStorage → Clear

**Reseed database:**
- `cd Backend && node seed.js`

**Full clean rebuild:**
```bash
rm -rf Backend/node_modules Frontend/node_modules
npm install --prefix Backend
npm install --prefix Frontend
npm run build --prefix Frontend
```

---

## 📞 Contact Info in Bakery

**Phone:** 051-5955285  
**WhatsApp:** +92 333 9440084  
**Address:** 155/B Main Road Gulzar-e-Quaid Near Masjid Al Rasheed, Rawalpindi

*(Configured in Backend/seed.js)*

---

**Status:** ✅ Ready to Deploy  
**Last Check:** All errors fixed, database seeding ready, API working
