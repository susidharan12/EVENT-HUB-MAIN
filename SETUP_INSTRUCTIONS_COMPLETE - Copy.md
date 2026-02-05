# 🚀 EventHub - Complete Setup Instructions

## ⚠️ Prerequisites

### 1. Install PostgreSQL
**Windows Installation:**
- Download from: https://www.postgresql.org/download/windows/
- Install with default settings
- Remember the password you set for 'postgres' user
- Default port: 5432

**Alternative: Use Docker**
```bash
docker run --name eventhub-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:latest
```

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE eventhub;

# Exit
\q
```

### 3. Update Backend .env File
```env
DB_USER=postgres
DB_PASSWORD=postgres        # Your PostgreSQL password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventhub
PORT=8080
JWT_SECRET=eventhub_secret_key_2026
```

---

## 📋 Step-by-Step Setup

### Step 1: Backend Setup
```bash
cd event-hub-Main/backend

# Install dependencies (if not already done)
npm install

# Create .env file with your PostgreSQL credentials
# (See .env.example for reference)

# Start backend server
node server.js
# Server runs on: http://localhost:8080
```

### Step 2: Frontend Setup
```bash
cd event-hub-Main/frontend

# Install dependencies (if not already done)
npm install

# Start frontend server
npm start
# Frontend runs on: http://localhost:5050
```

### Step 3: Test the Application

#### Test Login Flow:
1. Go to http://localhost:5050/Public/auth/pages/signup.html
2. Sign up with:
   - Name: Test User
   - Mobile: 9876543210
   - Email: test@gmail.com
   - Role: explorer (or organizer)
   - Password: Test@123

3. Go to http://localhost:5050/Public/auth/pages/login.html
4. Login with:
   - Email: test@gmail.com
   - Password: Test@123
5. You should see:
   - ✅ Green "Login Successful!" popup
   - Auto-redirect to appropriate dashboard

#### Test Forgot Password:
1. Go to http://localhost:5050/Public/auth/pages/forgot-password.html
2. Enter your email
3. Check backend console for OTP (appears as: `OTP for email@example.com: 123456`)
4. Enter OTP in the form
5. Set new password
6. Login with new password

---

## 🔧 Configuration

### Email Setup (Optional but Recommended)
To enable actual email sending for OTP:

1. Enable Gmail App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Get the 16-character app password

2. Update .env:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx  # 16-character app password
```

3. Restart backend server

### Without Email Configuration:
- OTP will appear in backend console
- Perfect for testing and development

---

## 🗄️ Database Schema

The database is automatically initialized on first server start with these tables:

- **users** - User accounts (organizer/explorer)
- **events** - Event listings
- **bookings** - User bookings
- **payments** - Payment records
- **check_ins** - Check-in records

---

## 🧪 API Endpoints

### Authentication
```
POST /api/auth/signup       - Register new user
POST /api/auth/login        - User login
GET  /api/auth/profile      - Get user profile (protected)
PUT  /api/auth/profile      - Update profile (protected)
POST /api/auth/send-otp     - Send OTP email
POST /api/auth/verify-otp   - Verify OTP
POST /api/auth/reset-password - Reset password
```

### Events
```
GET  /api/events            - List all events
POST /api/events            - Create event
GET  /api/events/:id        - Get event details
PUT  /api/events/:id        - Update event
DELETE /api/events/:id      - Delete event
```

### Bookings
```
POST /api/bookings          - Create booking
GET  /api/bookings          - Get user bookings
GET  /api/bookings/:id      - Get booking details
PUT  /api/bookings/:id/cancel - Cancel booking
POST /api/bookings/:id/checkin - Check in
```

### Payments
```
POST /api/payments          - Record payment
GET  /api/payments          - Get payment history
POST /api/payments/organizer/details - Set bank details
GET  /api/payments/organizer/details - Get bank details
```

---

## ⚡ Quick Test with cURL

### Test Signup
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "mobile": "9876543210",
    "email": "test@example.com",
    "password": "Test@123",
    "role": "explorer"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### Test Send OTP
```bash
curl -X POST http://localhost:8080/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

---

## 🐛 Troubleshooting

### Issue: "password authentication failed for user postgres"
**Solution:** Update DB credentials in .env file
```env
DB_PASSWORD=your_actual_postgres_password
```

### Issue: "Cannot connect to database"
**Solution:** Ensure PostgreSQL is running:
```bash
# Windows Task Manager: Check if "postgres" process is running
# Or restart PostgreSQL service
```

### Issue: Port already in use
**Solution:** Change PORT in .env or kill process on port:
```bash
# Windows: Find process on port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Issue: Module not found error
**Solution:** Reinstall dependencies
```bash
npm install
npm install nodemailer  # If missing
```

### Issue: Frontend not connecting to backend
**Solution:** Check API_BASE_URL in frontend config:
```javascript
// frontend/Public/js/config.js
const CONFIG = {
  API_BASE_URL: 'http://localhost:8080',
  // ...
};
```

### Issue: CORS errors
**Solution:** Backend is configured with CORS. If issues persist, check:
1. Backend server is running
2. API_BASE_URL matches backend URL
3. Browser console for specific error

---

## 📱 Feature Testing Checklist

### Authentication ✓
- [ ] Sign up with both roles (organizer/explorer)
- [ ] Login shows success popup
- [ ] Login navigates to correct dashboard
- [ ] Forgot password sends OTP
- [ ] OTP verification works
- [ ] Password reset succeeds

### Organizer Dashboard ✓
- [ ] Create event with details
- [ ] Upload multiple photos (up to 5)
- [ ] Edit event
- [ ] Delete event
- [ ] View event statistics

### Explorer Dashboard ✓
- [ ] Browse all events
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Filter by date range
- [ ] Search events
- [ ] View event details modal
- [ ] Register for event

### Payment ✓
- [ ] All 6 payment methods display
- [ ] QR code generates for UPI
- [ ] GST calculation works
- [ ] Form validation works

---

## 🚀 Deployment

### Local Development
```bash
# Terminal 1: Backend
cd event-hub-Main/backend
npm start  # or: node server.js

# Terminal 2: Frontend
cd event-hub-Main/frontend
npm start
```

### Production Build
```bash
# Frontend build
cd event-hub-Main/frontend
npm run build
# Serve from build/ directory

# Backend deployment
# Use environment variables instead of .env
# Set NODE_ENV=production
# Configure proper database and email services
```

---

## 📞 Support

If you encounter issues:

1. Check backend console for errors
2. Check browser console (F12) for client errors
3. Verify all services are running:
   - Backend: http://localhost:8080
   - Frontend: http://localhost:5050
4. Verify PostgreSQL is running
5. Check .env file has correct credentials

---

## ✅ Completion Checklist

- [ ] PostgreSQL installed and running
- [ ] Database 'eventhub' created
- [ ] .env file configured with correct credentials
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server started successfully
- [ ] Frontend server started successfully
- [ ] Can sign up new user
- [ ] Can login and see popup
- [ ] Login navigates to correct dashboard
- [ ] Can test OTP flow (check console for OTP)

---

**Once all items are checked, your EventHub application is ready to use! 🎉**
