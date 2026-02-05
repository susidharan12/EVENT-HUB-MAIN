# EventHub - Complete Event Management Application

## 🎉 Project Overview

EventHub is a full-stack event management application that allows users to:
- **Explore & Register**: Browse events, view details, and register for tickets
- **Organize & Manage**: Create events, upload photos, manage bookings and analytics
- **Secure Payments**: Multiple payment methods including UPI, Cards, and digital wallets
- **Account Security**: OTP-based password reset and authentication

## 🚀 Features Implemented

### ✅ User Authentication
- Email/Password Signup
- Email/Password Login  
- OTP-based Forgot Password with 6-digit verification
- Role-based access (Organizer & Explorer/User)
- Session management with JWT tokens
- Automatic token expiration and refresh

### ✅ Explorer (User) Dashboard
- **Event Discovery**: Browse all events with beautiful card layouts
- **Advanced Filtering**: Search by name, category, date range, and price
- **Event Details Modal**: Complete event information with photos
- **Easy Registration**: Select seats and register for events
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### ✅ Organizer Dashboard
- **Event Management**: Create, edit, and delete events
- **Photo Upload**: Upload up to 5 photos per event with carousel preview
- **Event Analytics**: View registrations, revenue, and capacity usage
- **Bank Details**: Manage bank information for payments
- **Dashboard Stats**: Quick overview of total events, registrations, and revenue

### ✅ Payment System
- **Multiple Payment Methods**:
  - UPI with QR Code generation
  - Google Pay
  - PhonePe
  - Paytm
  - Credit/Debit Cards
  - Net Banking

- **Secure Payment Processing**:
  - 18% GST calculation
  - Transaction details display
  - Payment confirmation

### ✅ User Interface
- **Modern Design**: Gradient backgrounds, smooth animations, and shadows
- **Attractive Colors**: Professional color scheme (Blues, Greens, Dark Grays)
- **Responsive Layout**: Mobile-first approach with proper breakpoints
- **Interactive Elements**: Hover effects, transitions, and smooth interactions
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during API calls

## 📋 Project Structure

```
event-hub-Main/
├── frontend/
│   └── Public/
│       ├── auth/
│       │   ├── pages/
│       │   │   ├── login.html
│       │   │   ├── signup.html
│       │   │   └── forgot-password.html
│       │   ├── js/
│       │   │   ├── login.js
│       │   │   ├── signup.js
│       │   │   └── forgot-password.js
│       │   └── css/
│       │       ├── login.css
│       │       └── signup.css
│       ├── organizer/
│       │   ├── pages/
│       │   │   └── dashboard.html
│       │   ├── js/
│       │   │   └── organizer.js
│       │   └── css/
│       │       └── organizer.css
│       ├── explorer/
│       │   ├── pages/
│       │   │   └── dashboard.html
│       │   ├── js/
│       │   │   └── explorer.js
│       │   └── css/
│       │       └── explorer.css
│       ├── User/
│       │   ├── pages/
│       │   │   ├── payment.html
│       │   │   └── booking-success.html
│       │   ├── js/
│       │   │   ├── payment.js
│       │   │   └── components/
│       │   └── css/
│       │       ├── style.css
│       │       ├── pages.css
│       │       └── components.css
│       └── js/
│           ├── config.js
│           ├── utils.js
│           ├── services/
│           │   ├── api.js
│           │   ├── auth.js
│           │   ├── dashboard.js
│           │   └── payment.js
│           └── components/
│               ├── toast.js
│               └── modal.js
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   ├── auth.js (with OTP endpoints)
│   │   ├── events.js
│   │   ├── bookings.js
│   │   └── payments.js
│   ├── scripts/
│   │   └── seed.js
│   ├── uploads/
│   └── package.json
└── database/
    └── schema.sql
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (for database)
- A terminal/command prompt

### Step 1: Clone/Navigate to Project

```bash
cd c:\Users\devil\OneDrive\Desktop\REACT-01\event-hub-Main
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Setup Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/eventhub
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Step 5: Setup Database

Create PostgreSQL database and run schema:

```bash
# Create database
createdb eventhub

# Run schema
psql eventhub < ../database/schema.sql
```

## ▶️ Running the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
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

### Terminal 2 - Start Frontend Server

```bash
cd frontend
npm start
```

The frontend will start on `http://127.0.0.1:5050` or another available port.

## 🌐 Accessing the Application

1. **Homepage**: `http://127.0.0.1:5050` (or assigned port)
2. **Login**: `http://127.0.0.1:5050/Public/auth/pages/login.html`
3. **Sign Up**: `http://127.0.0.1:5050/Public/auth/pages/signup.html`
4. **Forgot Password**: `http://127.0.0.1:5050/Public/auth/pages/forgot-password.html`

## 👤 Test Accounts

### Create New Account
1. Go to Sign Up page
2. Enter details with role (Organizer or Explorer)
3. Login with your credentials

### For Testing:

**Organizer Account**
- Role: Organizer
- Email: organizer@eventhub.com
- Password: password123

**Explorer Account**
- Role: Explorer
- Email: explorer@eventhub.com
- Password: password123

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/signup           - Register new user
POST   /api/auth/login            - Login user
GET    /api/auth/profile          - Get user profile (Protected)
POST   /api/auth/send-otp         - Send OTP for password reset
POST   /api/auth/verify-otp       - Verify OTP
POST   /api/auth/reset-password   - Reset password
```

### Events
```
GET    /api/events                - Get all events
POST   /api/events                - Create event (Organizer)
GET    /api/events/:id            - Get event details
PUT    /api/events/:id            - Update event (Organizer)
DELETE /api/events/:id            - Delete event (Organizer)
```

### Bookings
```
POST   /api/bookings              - Create booking
GET    /api/bookings              - Get user bookings
GET    /api/bookings/:id          - Get booking details
PUT    /api/bookings/:id/cancel   - Cancel booking
POST   /api/bookings/:id/checkin  - Check in to event
```

### Payments
```
POST   /api/payments              - Record payment
GET    /api/payments              - Get payment history
POST   /api/payments/organizer/details - Set organizer bank details
GET    /api/payments/organizer/details - Get organizer bank details
```

## 🎯 User Workflows

### Explorer/User Flow
1. **Sign Up** → Choose role "Explorer"
2. **Login** → Redirected to Explorer Dashboard
3. **Browse Events** → See all available events with filters
4. **View Details** → Click event card to see full details
5. **Register** → Select seats and register
6. **Payment** → Choose payment method and complete payment
7. **Confirmation** → Receive booking confirmation

### Organizer Flow
1. **Sign Up** → Choose role "Organizer"
2. **Login** → Redirected to Organizer Dashboard
3. **Create Event** → Fill event details and upload photos
4. **Manage Events** → View all created events
5. **View Analytics** → See registrations and revenue
6. **Bank Details** → Add bank information for payments

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Token expiration (7 days)
- ✅ OTP verification for password reset
- ✅ CORS enabled for safe cross-origin requests
- ✅ Input validation on both client and server
- ✅ Protected API endpoints with token verification

## 🎨 UI/UX Highlights

- **Gradient Backgrounds**: Modern, attractive color schemes
- **Smooth Animations**: Fade-in, slide-up transitions
- **Card-based Layout**: Easy to scan and navigate
- **Modal Dialogs**: Smooth pop-up interactions
- **Loading States**: Visual feedback during processing
- **Error Messages**: Clear, helpful error notifications
- **Toast Notifications**: Non-blocking success/error messages
- **Responsive Grid**: Auto-adjusting layouts for all screen sizes
- **Hover Effects**: Interactive elements with visual feedback

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🚀 Performance Optimizations

- Lazy loading of images
- Minimized CSS and JavaScript
- Efficient API calls with proper error handling
- Client-side filtering and search
- Smooth transitions without performance impact

## 🐛 Troubleshooting

### Backend not starting
- Check if port 3000 is already in use
- Verify PostgreSQL is running
- Check .env file configuration

### Frontend not loading
- Clear browser cache
- Check if port 5050 is available
- Verify all npm packages are installed

### Database connection error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists

### OTP not working
- OTP is logged in console during development
- Check backend console for OTP value
- OTP expires after 10 minutes

## 📞 Support

For issues or questions, check:
1. Browser console for JavaScript errors
2. Backend terminal for server logs
3. Network tab in DevTools for API errors
4. Database logs for SQL errors

## 📝 License

This project is part of EventHub - Event Management System

## ✨ Future Enhancements

- [ ] Real email integration for OTP
- [ ] SMS notifications
- [ ] Event reviews and ratings
- [ ] Wishlist functionality
- [ ] Social media sharing
- [ ] Advanced analytics dashboard
- [ ] Real payment gateway integration (Razorpay, Stripe)
- [ ] Notification system
- [ ] Admin dashboard
- [ ] Event recommendations
- [ ] Multi-language support

---

**Happy Event Managing! 🎉**
