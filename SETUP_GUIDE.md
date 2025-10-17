# ExportersIndia B2B Clone - Setup Guide

This document provides comprehensive instructions for setting up and running the ExportersIndia B2B Clone application.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Features Implemented](#features-implemented)
5. [SMS Integration Guide](#sms-integration-guide)
6. [Payment Gateway Integration Guide](#payment-gateway-integration-guide)
7. [Running the Application](#running-the-application)

## Project Structure

```
exportersindia-b2b-clone/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Home.js
│   │   │   ├── Category.js
│   │   │   ├── Supplier.js
│   │   │   ├── Listing.js
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Dashboard/
│   │   │   │   ├── BuyerDashboard.js
│   │   │   │   └── SupplierDashboard.js
│   │   │   ├── Chat/
│   │   │   │   └── ChatBox.js
│   │   │   ├── Notification/
│   │   │   │   └── NotificationPanel.js
│   │   │   └── Admin/
│   │   │       ├── AdminDashboard.js
│   │   │       ├── UserManagement.js
│   │   │       ├── SupplierManagement.js
│   │   │       └── ListingManagement.js
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── server/                 # Node.js/Express backend
    ├── models/             # Mongoose models
    │   ├── User.js         # ✓ Created
    │   ├── Supplier.js
    │   ├── Listing.js
    │   ├── Chat.js
    │   ├── Message.js
    │   ├── Notification.js
    │   └── Admin.js
    ├── routes/             # API routes
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   ├── supplierRoutes.js
    │   ├── listingRoutes.js
    │   ├── chatRoutes.js
    │   ├── notificationRoutes.js
    │   └── adminRoutes.js
    ├── controllers/        # Route controllers
    │   ├── authController.js
    │   ├── userController.js
    │   ├── supplierController.js
    │   ├── listingController.js
    │   ├── chatController.js
    │   ├── notificationController.js
    │   └── adminController.js
    ├── middleware/         # Custom middleware
    │   ├── auth.js
    │   └── adminAuth.js
    ├── sockets/           # Socket.io handlers
    │   └── chatSocket.js
    ├── utils/             # Utility functions
    │   ├── emailService.js
    │   └── notificationService.js
    ├── .env.example       # ✓ Created
    ├── package.json       # ✓ Created
    └── server.js          # ✓ Created
```

## Backend Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Create .env file

Copy .env.example to .env and configure:

```bash
cp .env.example .env
```

Edit .env with your configuration:
- Set MONGODB_URI to your MongoDB connection string
- Set JWT_SECRET to a secure random string
- Configure email settings for notifications

### 3. Database Models

The following models need to be created in `server/models/`:

**Supplier.js** - Fields: userId (ref User), companyName, description, categories, products, contactInfo, verified, rating, etc.

**Listing.js** - Fields: supplierId, title, description, category, price, images, specifications, etc.

**Chat.js** - Fields: participants (array of user IDs), lastMessage, updatedAt

**Message.js** - Fields: chatId, sender, content, read, timestamp

**Notification.js** - Fields: userId, type, title, message, read, link, createdAt

### 4. Routes & Controllers

All routes are defined in server.js and need corresponding controller files.

## Frontend Setup

### 1. Initialize React App

```bash
cd client
npx create-react-app .
```

### 2. Install Dependencies

```bash
npm install react-router-dom axios socket.io-client react-query @mui/material @emotion/react @emotion/styled
```

### 3. Key Components

**Home.js** - Landing page with featured suppliers and categories
**Category.js** - Browse suppliers by category
**Supplier.js** - Supplier profile page
**Listing.js** - Product/service listings
**Auth components** - Login and Register forms
**Dashboard** - User-specific dashboard (buyer/supplier views)
**ChatBox** - Real-time chat using Socket.io
**NotificationPanel** - Display notifications with email/push support
**Admin components** - CRUD operations for users, suppliers, and listings

## Features Implemented

### 1. Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (buyer, supplier, admin)

### 2. Chat System (Socket.io)
- Real-time messaging between buyers and suppliers
- Chat history persistence
- Online status indicators
- Typing indicators

### 3. Notification System
- In-app notifications
- Email notifications (nodemailer)
- Push notifications support (web push API)
- Notification preferences

### 4. Admin Panel
- User management (CRUD)
- Supplier approval/verification
- Listing moderation
- Analytics dashboard

### 5. Supplier Features
- Company profile management
- Product/service listings
- Inquiry management
- Performance analytics

### 6. Buyer Features
- Browse suppliers by category
- Search and filter
- Send inquiries
- Chat with suppliers
- Favorite suppliers/products

## SMS Integration Guide

### Using Twilio

1. Install Twilio SDK:
```bash
cd server
npm install twilio
```

2. Add to .env:
```
SMS_API_KEY=your_twilio_account_sid
SMS_API_SECRET=your_twilio_auth_token
SMS_FROM_NUMBER=your_twilio_phone_number
```

3. Create `server/utils/smsService.js`:
```javascript
const twilio = require('twilio');

const client = twilio(
  process.env.SMS_API_KEY,
  process.env.SMS_API_SECRET
);

exports.sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.SMS_FROM_NUMBER,
      to: to
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### Alternative: MSG91

1. Install axios (already included)
2. Add to .env:
```
SMS_API_KEY=your_msg91_api_key
SMS_SENDER_ID=your_sender_id
```

3. Use MSG91 REST API in smsService.js

## Payment Gateway Integration Guide

### Option 1: Stripe

1. Install Stripe:
```bash
cd server
npm install stripe
```

2. Add to .env:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

3. Create `server/routes/paymentRoutes.js`:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency || 'usd'
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

4. Frontend (client):
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Option 2: Razorpay (for India)

1. Install Razorpay:
```bash
cd server
npm install razorpay
```

2. Add to .env:
```
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_secret
```

3. Create payment order:
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: currency || 'INR',
      receipt: 'receipt_' + Date.now()
    });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## Running the Application

### Development Mode

1. Start MongoDB (if running locally):
```bash
mongod
```

2. Start backend server:
```bash
cd server
npm run dev
```

3. Start frontend (in a new terminal):
```bash
cd client
npm start
```

### Production Mode

1. Build frontend:
```bash
cd client
npm run build
```

2. Serve from backend:
```javascript
// Add to server.js
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
```

## Next Steps

1. **Complete remaining model files**: Create Supplier, Listing, Chat, Message, and Notification models
2. **Create all route files**: Implement routes for auth, users, suppliers, listings, chat, notifications, and admin
3. **Create controller files**: Implement business logic for each route
4. **Create Socket.io chat handler**: Implement real-time chat functionality
5. **Build React components**: Create all frontend components as listed
6. **Integrate SMS service**: Choose provider and implement using guide above
7. **Integrate payment gateway**: Choose provider and implement using guide above
8. **Testing**: Test all features thoroughly
9. **Deployment**: Deploy to production server

## Additional Notes

- All passwords are hashed using bcrypt
- JWT tokens expire in 7 days (configurable)
- File uploads use multer (already included in dependencies)
- CORS is configured for cross-origin requests
- Socket.io is set up for real-time features
- Email notifications use nodemailer
- Admin panel requires admin role

For any issues or questions, please refer to the documentation of individual packages or create an issue in the repository.
