# 📊 Complete Workflow Diagram

## Customer Journey (End-to-End)

```
┌─────────────────────────────────────────────────────────────┐
│                   BAKERY WEBSITE WORKFLOW                   │
└─────────────────────────────────────────────────────────────┘

PHASE 1: DISCOVERY
════════════════════════════════════════════════════════════════

    Customer Opens Website (http://localhost:5173)
              │
              ▼
    [Home Page]
    • Hero section with bakery info
    • "Browse Menu" button
    • "Track Order" button
              │
              ├─► Click "Browse Menu" ──────┐
              │                               │
              ▼                               │ Click "Track Order"
    [Menu Page]                        [Track Order Page]
    • Fetch /api/categories             • Enter order number
    • List: Pizza, Burgers, etc.        • Fetch /api/orders/track/{orderNumber}
    • Default sort by sortOrder         • Display status & items
              │
              ▼
    [Category Filter]
    • User selects "Pizza"
    • Fetch /api/products?category=Pizza
              │
              ▼
    [Product Grid]
    • Display 10 pizza options
    • Each shows: name, image, price/sizes


PHASE 2: SHOPPING
════════════════════════════════════════════════════════════════

    User Clicks Product
              │
              ▼
    [Product Details Modal]
    ├─ Product name & description
    ├─ Images
    ├─ Size selection (if has sizes)
    │  └─ "S" ($650), "M" ($950), "L" ($1450), "XL" ($1900)
    └─ Quantity selector
              │
              ▼
    User Clicks "Add to Cart"
              │
              ├─► Updates CartContext (React state)
              ├─► Persists to localStorage
              └─► Navbar cart count +1
              │
              ▼
    [Repeat] User adds more items...
              │
              ▼
    User Clicks Cart Icon (Navbar)
              │
              ▼
    [Shopping Cart Page]
    • Shows all items
    • Item details: name, size, quantity, subtotal
    • Total: sum of all item prices
    • "Continue Shopping" or "Checkout"


PHASE 3: CHECKOUT
════════════════════════════════════════════════════════════════

    User Clicks "Checkout"
              │
              ▼
    [Checkout Form]
    ├─ Customer Info Section:
    │  ├─ Name (required) .......................... "John Doe"
    │  ├─ Phone (required) ......................... "03001234567"
    │  ├─ Email (optional) ......................... "john@example.com"
    │  └─ Notes (optional) ......................... "Extra cheese"
    │
    ├─ Order Type Selection:
    │  ├─ "Pickup" (selected)
    │  └─ "Delivery"
    │      └─ If Delivery selected:
    │         ├─ Address input (required)
    │         ├─ Delivery distance (km)
    │         └─ Auto-calculate delivery fee:
    │            └─ Fee = distance * rate (e.g., distance * 50)
    │
    ├─ Order Summary:
    │  ├─ Subtotal (items only)
    │  ├─ Delivery Fee (0 if pickup)
    │  └─ TOTAL (highlighted)
    │
    └─ [Place Order] button
              │
              ▼
    Validation on Frontend:
    ├─ Name & Phone required?
    └─ Delivery: Address & distance required?
         (If validation fails → alert & stay on form)
              │
              ▼
    [Frontend] POST /api/orders
    
    Payload:
    {
      "customerName": "John Doe",
      "phone": "03001234567",
      "email": "john@example.com",
      "address": "123 Main St",
      "notes": "Extra cheese",
      "items": [
        { "productId": "..._id...", "size": "M", "quantity": 2 },
        { "productId": "..._id...", "size": null, "quantity": 1 }
      ],
      "orderType": "delivery",
      "deliveryDistance": 5,
      "deliveryFee": 250
    }


PHASE 4: BACKEND PROCESSING
════════════════════════════════════════════════════════════════

    Backend receives POST /api/orders
              │
              ▼
    [Validation]
    ├─ Customer name required? ✓
    ├─ Phone number required? ✓
    ├─ Address required (if delivery)? ✓
    └─ Items array has items? ✓
              │
              ▼
    [Product Verification] FOR EACH ITEM:
    ├─ Fetch product from DB by productId
    ├─ Check product exists?
    ├─ Check product available = true?
    └─ Get product price:
       ├─ If item has size → find matching size in sizes array
       └─ Else → use flat price field
              │
              ▼
    [Calculate Totals]
    ├─ For each item: price × quantity = line total
    ├─ Subtotal = sum of all line totals (NO delivery fee)
    ├─ Delivery fee: passed from frontend (server-side validated)
    └─ Total = Subtotal + Delivery Fee
              │
              ▼
    [Generate Order Number]
    └─ Format: ORD-{Date.now()}-{3-digit-random}
       Example: ORD-1734567890123-456
       Check: Ensure unique in DB (no duplicates)
              │
              ▼
    [Save Order to Database]
    └─ Create Order document:
       {
         "bakeryId": "...",
         "orderNumber": "ORD-...",
         "customerName": "John Doe",
         "phone": "03001234567",
         "email": "john@example.com",
         "address": "123 Main St",
         "notes": "Extra cheese",
         "items": [{ productId, name, size, price, quantity }],
         "orderType": "delivery",
         "deliveryDistance": 5,
         "deliveryFee": 250,
         "subtotal": 3900,
         "totalAmount": 4150,
         "status": "Pending",
         "createdAt": "2024-01-15T10:30:00Z"
       }
              │
              ▼
    [Generate WhatsApp Message]
    └─ Format:
       """
       🎉 New Order from Super Ideal Bakers!
       
       Order #: ORD-1734567890123-456
       Customer: John Doe
       Phone: 03001234567
       Email: john@example.com
       
       📦 Items:
       - Pizza Margherita (M) × 2 @ 950 = 1900
       - Zinger Burger × 1 @ 300 = 300
       
       📍 Delivery to: 123 Main St
       Distance: 5 km
       Delivery Fee: 250
       
       Subtotal: 2200
       Total: 2450
       
       Notes: Extra cheese
       """
              │
              ▼
    [Prepare WhatsApp Link]
    └─ https://wa.me/923339440084?text={encoded_message}
       (Pre-filled message opens customer's WhatsApp)
              │
              ▼
    [Response to Frontend]
    {
      "orderNumber": "ORD-1734567890123-456",
      "whatsappLink": "https://wa.me/923339440084?text=...",
      "totalAmount": 2450
    }


PHASE 5: CONFIRMATION
════════════════════════════════════════════════════════════════

    Frontend receives success response
              │
              ├─► Update state: orderPlaced = true
              ├─► Clear cart (localStorage)
              └─► Show confirmation page
              │
              ▼
    [Order Confirmation Page]
    ├─ ✅ "Order placed successfully!"
    ├─ Order Number: ORD-1734567890123-456 (copyable)
    ├─ Total Amount: 2450
    ├─ Items recap
    ├─ [Open WhatsApp] button
    │  └─ Clicks → Opens https://wa.me/...
    │     → Customer's WhatsApp app opens
    │     → Message pre-filled
    │     → Customer sends to bakery
    │
    └─ [Track Order] link
       └─ Takes to /track-order?id=ORD-1734567890123-456


PHASE 6: ORDER TRACKING
════════════════════════════════════════════════════════════════

    Customer (or bakery) visits: /track-order
              │
              ▼
    [Track Order Form]
    • Enter order number: ORD-1734567890123-456
    • Click [Track]
              │
              ▼
    Frontend: GET /api/orders/track/{orderNumber}
              │
              ▼
    Backend retrieves order from DB
              │
              ▼
    [Order Status Page]
    ├─ Order #: ORD-1734567890123-456
    ├─ Customer: John Doe
    ├─ Status Timeline:
    │  ├─ ⏳ Pending (current: 5 min ago)
    │  ├─ □ Confirmed
    │  ├─ □ Preparing
    │  ├─ □ Out For Delivery
    │  └─ □ Delivered
    │
    ├─ Order Details:
    │  ├─ Order Type: Delivery
    │  ├─ Items: (list)
    │  ├─ Subtotal: 2200
    │  ├─ Delivery Fee: 250
    │  └─ Total: 2450
    │
    └─ Delivery Address: 123 Main St (if delivery)


PHASE 7: ADMIN ORDER MANAGEMENT
════════════════════════════════════════════════════════════════

    Admin logs in: http://localhost:5173/admin
              │
              ▼
    [Admin Dashboard]
    ├─ Recent Orders Table
    │  └─ Shows: Order#, Customer, Status, Total, Time
    │
    ├─ Filter Options
    │  └─ By Status: Pending, Confirmed, Preparing, Delivering, Delivered
    │
    ├─ Action per Order
    │  ├─ View Details
    │  ├─ Update Status
    │  │  └─ Pending → Confirmed → Preparing → Out For Delivery → Delivered
    │  │     Or → Cancelled
    │  └─ Print Order (optional)
    │
    └─ Charts:
       ├─ Revenue Today/Week/Month
       ├─ Top Selling Products
       └─ Order Status Distribution


DATABASE SCHEMA OVERVIEW
════════════════════════════════════════════════════════════════

Bakery Collection:
├─ bakeryName: "Super Ideal Bakers"
├─ phone: "051-5955285"
├─ whatsappNumber: "923339440084"
└─ address: "155/B Main Road Gulzar-e-Quaid..."

Category Collection:
├─ _id: ObjectId
├─ bakeryId: ObjectId (ref: Bakery)
├─ name: "Pizza" | "Burgers" | ...
├─ sortOrder: 1, 2, 3, ...
└─ active: true

Product Collection:
├─ _id: ObjectId
├─ bakeryId: ObjectId (ref: Bakery)
├─ categoryId: ObjectId (ref: Category)
├─ name: "Margherita Pizza"
├─ description: "..."
├─ price: 650 (if no sizes)
├─ sizes: [
│   { label: "S", price: 650 },
│   { label: "M", price: 950 },
│   ...
│ ]
└─ available: true

Order Collection:
├─ _id: ObjectId
├─ bakeryId: ObjectId (ref: Bakery)
├─ orderNumber: "ORD-1734567890123-456" (unique, indexed)
├─ customerName: "John Doe"
├─ phone: "03001234567"
├─ email: "john@example.com"
├─ address: "123 Main St"
├─ items: [
│   {
│     productId: ObjectId,
│     name: "Pizza Margherita",
│     size: "M",
│     price: 950,
│     quantity: 2
│   }
│ ]
├─ orderType: "delivery" | "pickup"
├─ deliveryDistance: 5
├─ deliveryFee: 250
├─ subtotal: 2200 (items only)
├─ totalAmount: 2450 (subtotal + fee)
├─ status: "Pending"
├─ notes: "Extra cheese"
├─ whatsappMessage: "🎉 New Order..."
├─ createdAt: "2024-01-15T10:30:00Z"
└─ updatedAt: "2024-01-15T10:30:00Z"


API ENDPOINT QUICK REFERENCE
════════════════════════════════════════════════════════════════

GET /api/categories
→ Returns: [{ _id, name, sortOrder, active }, ...]

GET /api/products
→ Returns: [{ _id, name, price|sizes, available }, ...]

GET /api/products?category=Pizza
→ Returns: [{ products filtered by category }]

POST /api/orders
→ Accepts: checkout payload
→ Returns: { orderNumber, whatsappLink, totalAmount }

GET /api/orders/track/{orderNumber}
→ Returns: { full order details with status }

GET /api/admin/orders
→ Returns: [{ all orders paginated }]

PATCH /api/admin/orders/{id}/status
→ Accepts: { status: "Delivered" }
→ Returns: { updated order }


DEPLOYMENT CHECKLIST
════════════════════════════════════════════════════════════════

Pre-Launch (Local Testing):
✓ Start both servers
✓ Run seed script
✓ Test menu loads
✓ Test add to cart
✓ Test checkout flow
✓ Verify order confirmation shows
✓ Test order tracking
✓ Admin dashboard works

Pre-Production:
- [ ] Buy domain name
- [ ] Set up SSL certificate (HTTPS)
- [ ] Choose hosting:
  - Backend: Render, Railway, Heroku, AWS, DigitalOcean
  - Frontend: Vercel, Netlify, AWS S3 + CloudFront
  - Database: Already on MongoDB Atlas (cloud)
- [ ] Configure production environment variables
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Configure CORS to allow production domain
- [ ] Test all flows on production
- [ ] Set up monitoring and logging
- [ ] Configure backups

Launch Day:
- [ ] Deploy backend
- [ ] Deploy frontend (build + deploy dist/)
- [ ] Run seed script on production DB
- [ ] Verify end-to-end flow
- [ ] Monitor logs for errors
- [ ] Announce to users


PERFORMANCE OPTIMIZATIONS (Optional)
════════════════════════════════════════════════════════════════

Frontend:
- Lazy load images with Intersection Observer
- Code splitting for admin pages
- Compress images before upload
- Cache API responses with React Query or SWR

Backend:
- Add database indexes on frequently queried fields
- Implement pagination for large result sets
- Cache category list (rarely changes)
- Add rate limiting to API endpoints
- Compress API responses with gzip

Database:
- Regular backups
- Monitor connection pool
- Optimize queries (avoid N+1)

────────────────────────────────────────────────────────────────
Version: 1.0 | Status: Production Ready | Last Updated: 2024
────────────────────────────────────────────────────────────────
