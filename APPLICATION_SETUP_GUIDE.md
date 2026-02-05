# EventHub - Complete Application Setup Guide

## ✅ What Has Been Completed

### 1. **Project Dependencies** ✓
- ✅ Backend dependencies installed (npm install in backend/)
- ✅ Frontend dependencies installed (npm install in frontend/)
- ✅ All required packages are available

### 2. **Authentication System** ✓
- ✅ User signup with role selection (Organizer/Explorer)
- ✅ Email/password login with JWT tokens
- ✅ **NEW**: OTP-based forgot password system
  - Send OTP to email (backend endpoint: POST /api/auth/send-otp)
  - Verify OTP (backend endpoint: POST /api/auth/verify-otp)
  - Reset password (backend endpoint: POST /api/auth/reset-password)
- ✅ Session management with localStorage
- ✅ Fixed login navigation to proper dashboards

### 3. **Role-Based Dashboards** ✓

#### Organizer Dashboard (/Public/organizer/pages/dashboard.html)
- ✅ **Dashboard Tab**: Stats overview (total events, registrations, revenue, rating)
- ✅ **Create Event Tab**: 
  - Event title, category, date, description, location, price, seats
  - **Multiple photo upload** with carousel preview (up to 5 photos)
  - Drag & drop file upload
- ✅ **My Events Tab**: List all events with filters and search
- ✅ **Analytics Tab**: Event statistics and revenue tracking
- ✅ **Profile Tab**: User info and bank details management
- ✅ Responsive sidebar navigation
- ✅ Logout functionality

#### Explorer/User Dashboard (/Public/explorer/pages/dashboard.html)
- ✅ **Hero Section**: Beautiful welcome banner
- ✅ **Event Discovery**:
  - Advanced filters (category, date range, price)
  - Search functionality
  - Event cards with images and details
- ✅ **Event Detail Modal**:
  - Full event information
  - Photo gallery
  - Seat selection
  - Registration button
- ✅ Responsive grid layout
- ✅ Real-time availability updates

### 4. **Event Management** ✓
- ✅ Create events with full details
- ✅ Upload multiple photos per event
- ✅ Browse all events
- ✅ Filter events by various criteria
- ✅ View detailed event information
- ✅ Register for events

### 5. **Payment System** ✓
Created comprehensive payment page (/Public/User/pages/payment.html) with:
- ✅ **Multiple Payment Methods**:
  - UPI with QR Code generation
  - Google Pay
  - PhonePe
  - Paytm
  - Credit/Debit Cards
  - Net Banking

Features:
- ✅ Payment method selection UI
- ✅ QR code generation for UPI payments
- ✅ Card details form with validation
- ✅ Net banking bank selection
- ✅ Automatic GST (18%) calculation
- ✅ Total amount calculation
- ✅ Payment confirmation
- ✅ Order summary display

### 6. **Password Reset with OTP** ✓
Created forgot password page (/Public/auth/pages/forgot-password.html) with:
- ✅ **Step 1**: Enter email to receive OTP
- ✅ **Step 2**: Verify OTP (6-digit input with auto-focus)
- ✅ **Step 3**: Create new password
- ✅ **Features**:
  - Progressive step indicator
  - OTP resend with 30-second timer
  - Password strength meter
  - Input validation
  - Success confirmation
  - Auto-redirect to login

### 7. **Modern UI Design** ✓
- ✅ Gradient backgrounds (blue, purple, green theme)
- ✅ Smooth animations (fadeIn, slideUp transitions)
- ✅ Card-based layouts
- ✅ Shadow effects and depth
- ✅ Responsive design for all screen sizes
- ✅ Hover effects on interactive elements
- ✅ Professional color scheme
- ✅ Loading states and spinners
- ✅ Toast notifications for feedback
- ✅ Modal dialogs for important actions

### 8. **Services & Utilities** ✓
Created comprehensive service layers:
- ✅ **API Service** (js/services/api.js): RESTful API communication
- ✅ **Auth Service** (js/services/auth.js): Authentication and session management
- ✅ **Dashboard Service** (js/services/dashboard.js): Role-based navigation
- ✅ **Payment Service** (js/services/payment.js): Payment processing and QR generation
- ✅ **Utils** (js/utils.js): Helper functions
- ✅ **Components**: Toast notifications, Modal dialogs

### 9. **Backend Enhancements** ✓
- ✅ Added OTP endpoints to auth routes:
  - `POST /api/auth/send-otp` - Generate and send OTP
  - `POST /api/auth/verify-otp` - Verify OTP validity
  - `POST /api/auth/reset-password` - Reset password with OTP
- ✅ OTP storage with expiration (10 minutes)
- ✅ Attempt limiting (max 3 attempts)
- ✅ Secure password hashing

## 🚀 How to Run the Application

### Prerequisites
```
- Node.js installed
- PostgreSQL running
- Two terminal windows open
```

### Terminal 1: Start Backend Server

```bash
cd "c:\Users\devil\OneDrive\Desktop\REACT-01\event-hub-Main\backend"
npm start
```

Expected output:
```
✅ Server running at http://0.0.0.0:3000
📚 API Documentation:
   POST /api/auth/signup
   POST /api/auth/login
   ...
```

**Note**: If port 3000 is already in use, modify `backend/server.js`:
```javascript
const PORT = process.env.PORT || 5001; // Change 5001 to any available port
```

### Terminal 2: Start Frontend Server

```bash
cd "c:\Users\devil\OneDrive\Desktop\REACT-01\event-hub-Main\frontend"
npm start
```

Expected output:
```
Serving "C:\...\frontend" at http://127.0.0.1:5050
Ready for changes
```

Frontend will be available at: **http://127.0.0.1:5050** (or next available port)

## 🧪 Testing the Application

### Test User Sign-Up
1. Visit login page: `http://127.0.0.1:5050/Public/auth/pages/login.html`
2. Click "Sign up here"
3. Fill form:
   - Name: Your Name
   - Mobile: 9999999999 (10 digits)
   - Email: test@email.com
   - Password: Password123
   - Role: Select "explorer" or "organizer"
4. Click Sign Up
5. Automatically logs in and redirects to dashboard

### Test Organizer Workflow
1. Sign up with role: **Organizer**
2. Redirect to: `/Public/organizer/pages/dashboard.html`
3. Create Event:
   - Fill all event details
   - Upload 1-5 photos
   - Click "Create Event"
4. View in "My Events" tab
5. Check dashboard stats update

### Test Explorer Workflow
1. Sign up with role: **Explorer**
2. Redirect to: `/Public/explorer/pages/dashboard.html`
3. Browse events:
   - Use search box
   - Filter by category, date, price
4. Click event card to see details
5. Select seats and register
6. Proceed to payment

### Test Forgot Password
1. Go to: `http://127.0.0.1:5050/Public/auth/pages/forgot-password.html`
2. Step 1: Enter registered email
3. Step 2: Enter OTP (check backend console for OTP value during development)
4. Step 3: Enter new password
5. Success message and redirect to login

### Test Payment
1. After event registration
2. Redirect to payment page
3. Select payment method:
   - **UPI**: Shows QR code
   - **Card**: Enter card details
   - **NetBanking**: Select bank
   - **Apps**: Shows app QR code
4. Click "Pay" button
5. Confirmation page

## 📱 File Structure Overview

### Key New Files Created:

```
Frontend:
  └── organizer/
      ├── pages/dashboard.html           (NEW)
      ├── js/organizer.js                (NEW)
      └── css/organizer.css              (NEW)
  
  └── explorer/
      ├── pages/dashboard.html           (NEW)
      ├── js/explorer.js                 (NEW)
      └── css/explorer.css               (NEW)
  
  └── auth/
      ├── pages/forgot-password.html     (NEW)
      └── js/forgot-password.js          (NEW)
  
  └── User/pages/
      └── payment.html                   (NEW)
      └── payment.js                     (NEW)
  
  └── js/services/
      ├── dashboard.js                   (NEW)
      └── payment.js                     (NEW)

Backend:
  └── routes/auth.js                     (UPDATED - Added OTP endpoints)
```

## 🔗 API Endpoints Summary

### Authentication (NEW/UPDATED)
```
POST   /api/auth/send-otp              - Send OTP to email
POST   /api/auth/verify-otp            - Verify OTP code
POST   /api/auth/reset-password        - Reset password with OTP
```

### Existing Endpoints
```
POST   /api/auth/signup                - Register
POST   /api/auth/login                 - Login
GET    /api/auth/profile               - Get profile (Protected)
GET    /api/events                     - List events
POST   /api/events                     - Create event
GET    /api/events/:id                 - Get event detail
PUT    /api/events/:id                 - Update event
DELETE /api/events/:id                 - Delete event
POST   /api/bookings                   - Create booking
GET    /api/bookings/:id               - Get booking detail
POST   /api/payments                   - Process payment
```

## 🎨 Color Scheme Used

- **Primary Blue**: #3498db, #2980b9
- **Success Green**: #27ae60, #229954
- **Danger Red**: #e74c3c, #c0392b
- **Dark Text**: #2c3e50
- **Light Text**: #7f8c8d
- **Background**: #f5f7fa, #ecf0f1
- **Gradients**: Multiple gradient overlays for modern look

## 📊 Database Schema

Tables created (via schema.sql):
- `users` - User accounts with roles
- `events` - Event details
- `bookings` - User event registrations
- `checkins` - Event check-in records
- `payments` - Payment transactions

## 🔐 Security Implementation

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Token verification middleware on protected routes
- ✅ CORS enabled for safe requests
- ✅ Input validation (email, phone, password)
- ✅ OTP expiration (10 minutes)
- ✅ Rate limiting on attempts (3 attempts max)
- ✅ Secure session management

## 📈 Performance Features

- ✅ Client-side filtering (no extra API calls)
- ✅ Efficient event search and category filtering
- ✅ Lazy loading for images
- ✅ Smooth animations without lag
- ✅ Proper error handling and user feedback

## 🐛 Common Issues & Solutions

### Issue: Port already in use
**Solution**: Change PORT in server.js or backend package.json

### Issue: Database connection failed
**Solution**: Ensure PostgreSQL is running and DATABASE_URL is correct

### Issue: Frontend can't reach backend API
**Solution**: Check API.BASE_URL in config.js matches your backend URL

### Issue: OTP not received
**Solution**: Check backend console for OTP (development mode)
In production, integrate actual email service

## 🎯 Next Steps (Optional Enhancements)

1. **Email Integration**
   - Send actual emails for OTP
   - Email confirmations for bookings

2. **Real Payment Gateway**
   - Razorpay integration
   - Stripe integration
   - Actual payment processing

3. **SMS Notifications**
   - Send booking confirmations via SMS
   - Event reminders

4. **Advanced Features**
   - Event reviews and ratings
   - Wishlist functionality
   - Recommendation engine
   - Admin dashboard

5. **Analytics**
   - Detailed revenue reports
   - Popular events analysis
   - User activity tracking

## ✅ Verification Checklist

- [x] All dependencies installed
- [x] Organizer dashboard created with photo upload
- [x] Explorer dashboard with event browsing
- [x] Payment page with multiple methods
- [x] Forgot password with OTP
- [x] Login navigation fixed
- [x] Modern UI applied throughout
- [x] Responsive design verified
- [x] Backend OTP endpoints added
- [x] All features documented

## 📞 Support Resources

- Check browser DevTools Console for errors
- Check backend terminal for server logs
- Verify network requests in Network tab
- Test with different user roles
- Try different browsers for compatibility

---

**Application is ready to use! 🎉**

Start both servers and begin exploring EventHub!
