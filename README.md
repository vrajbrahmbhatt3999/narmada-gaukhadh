# Narmada Gaukhadh (નર્મદા ગૌખાધ) — E-Commerce Platform

A production-oriented, responsive e-commerce web platform for **Narmada Gaukhadh**, an Indian agricultural brand providing premium organic fertilizers and soil nourishment products derived from traditional cow-based farming practices.

Built with a modern tech stack focused on high performance, clean aesthetics, farmer accessibility, dual checkout pathways (PayU Payment Gateway + WhatsApp direct ordering), and robust server-side security.

---

## 🌾 Products

| Product | Type | Available Packs | Description |
|---|---|---|---|
| **Narmada Vermicompost** | Solid Organic Fertilizer | 5 kg, 25 kg, 50 kg | Earthworm-processed organic compost enriched with beneficial microbes and essential plant nutrients (N-P-K). |
| **Narmada Vidhyanchal** | Liquid Bio-Fertilizer | 500 ml, 1 L, 5 L | Concentrated liquid biological plant energizer formulated with Panchagavya-inspired organic extracts for foliar spray and drip irrigation. |

> **Note on Content & Pricing**: All weights, formulations, prices, and shipping policies are marked with clear pre-launch placeholders (`[Confirm before launch]`). Update `frontend/src/config/products.ts` and `backend/src/config/products.ts` with verified figures prior to real-money transactions.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 + Custom CSS Design System (`index.css`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms & Validation**: React Hook Form
- **Routing**: React Router v7 (`react-router-dom`)
- **SEO**: Dynamic document titles, meta tags, and Schema.org JSON-LD structured data for products and organization

### Backend
- **Server**: Fastify 5 + TypeScript (ESM)
- **Database & ORM**: PostgreSQL + Prisma ORM (v6)
- **Security**: `@fastify/helmet`, `@fastify/cors`, `@fastify/rate-limit`, sensitive payload logging redaction
- **Payments**: PayU Hosted Checkout (Server-side SHA-512 hash generation & verification, idempotent database transaction recording)
- **Alternative Checkout**: Direct WhatsApp Order Generator with formatted order summary

---

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Navbar, Footer, MobileNav, Layout
│   │   │   ├── sections/          # HeroSection, ProductShowcase, ProcessSection, etc.
│   │   │   └── ui/                # PolicyPage, Toast, Modals, Buttons
│   │   ├── config/
│   │   │   └── products.ts        # Central product & business configuration
│   │   ├── features/
│   │   │   └── cart/              # CartContext, cart state & localStorage persistence
│   │   ├── lib/
│   │   │   └── whatsapp.ts        # WhatsApp click-to-chat URL & message builder
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── ShopPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── NotFoundPage.tsx
│   │   │   ├── policies/          # Privacy, Terms, Shipping, Cancellation
│   │   │   └── payments/          # Success, Failed, Pending
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Order, OrderItem, PaymentRecord, Enquiry
│   ├── src/
│   │   ├── config/
│   │   │   └── products.ts        # Authoritative server-side prices (in paise)
│   │   ├── routes/
│   │   │   ├── products.ts        # GET /api/products, GET /api/products/:slug
│   │   │   ├── orders.ts          # POST /api/orders/initiate, /api/payments/payu-response
│   │   │   └── enquiries.ts       # POST /api/enquiries (bulk/dealer lead collection)
│   │   ├── services/
│   │   │   ├── db.ts              # Prisma client singleton
│   │   │   └── payu.ts            # PayU SHA-512 hash generation and verification
│   │   └── server.ts              # Fastify entrypoint with CORS, Helmet, Rate Limiter
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- PostgreSQL database instance (local, Docker, or hosted like Neon/Supabase)

---

### 1. Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and supply your DATABASE_URL, PAYU_KEY, PAYU_SALT, etc.

# 3. Generate Prisma client & run database migrations
npx prisma generate
npx prisma migrate dev --name init

# 4. Start the development server
npm run dev
# The API runs on http://localhost:4000
```

### 2. Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local if changing backend API URL or WhatsApp phone number

# 3. Start development server
npm run dev
# The frontend runs on http://localhost:3000
```

---

## 💳 Payment Gateway Flow (PayU)

1. **Cart Submission**: Frontend sends cart items and customer shipping details to `POST /api/orders/initiate`.
2. **Server-Side Validation**:
   - Order total is recalculated authoritatively from `backend/src/config/products.ts` in **paise** (1 INR = 100 paise) to prevent client-side amount tampering.
   - An `Order` record with status `PENDING` is created in PostgreSQL.
3. **Hash Generation**:
   - Backend calculates the PayU SHA-512 request hash:
     ```
     sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
     ```
   - PayU form payload is returned to the frontend.
4. **Auto-Submit to PayU**:
   - Frontend renders a hidden HTML form and immediately submits it to `https://secure.payu.in/_payment` (or `https://test.payu.in/_payment` in sandbox).
5. **Callback & Verification**:
   - Upon customer completion, PayU posts to `POST /api/payments/payu-response`.
   - Backend verifies the response reverse hash:
     ```
     sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
     ```
   - If hash matches and amount equals recorded order amount, the order is updated to `PAID`.
   - The user is redirected to the corresponding frontend result page (`/payments/success` or `/payments/failed`).

---

## 📲 Direct WhatsApp Ordering Flow

For Indian farmers, agricultural co-operatives, or rural customers who prefer conversing directly before purchasing:
- Customers can click **"Order via WhatsApp"** from any product card, detail page, or cart.
- The platform pre-populates a polite, structured WhatsApp message containing:
  - Product Name & Selected Pack Variant
  - Quantity
  - Approximate Total Price
  - Customer Delivery Address (if filled during checkout)
- Opens WhatsApp Web (desktop) or WhatsApp App (mobile) directly with the business's number.

---

## 📋 Pre-Launch Checklist

Before launching to live customers:

- [ ] **Business Contact**: Fill in actual mobile number, business email, and physical registered address in `frontend/src/config/products.ts`.
- [ ] **WhatsApp Number**: Set `SITE_CONFIG.whatsappNumber` to the verified WhatsApp Business number in international format without `+` (e.g. `919876543210`).
- [ ] **Catalog & Pricing**: Review and adjust pack sizes and prices in `frontend/src/config/products.ts` and `backend/src/config/products.ts`.
- [ ] **Delivery Rules**: Confirm flat-rate shipping charge and free shipping threshold.
- [ ] **PayU Production Credentials**: Replace test `PAYU_KEY` and `PAYU_SALT` with production merchant keys from the PayU merchant dashboard. Change `PAYU_ENV=production`.
- [ ] **Legal Policies**: Review the Privacy Policy, Terms & Conditions, Shipping Policy, and Cancellation/Refund Policy pages with legal counsel.
- [ ] **Database Backups**: Ensure automated daily backups are configured on the PostgreSQL production host.

---

## 📜 License

Proprietary © Narmada Gaukhadh. All rights reserved.
# narmada-gaukhadh
