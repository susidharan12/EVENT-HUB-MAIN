# 🛠️ EventHub - Development Mode Setup

## Quick Start (For Development Testing)

### Without PostgreSQL (Mock Mode)
If you don't have PostgreSQL installed, you can test the frontend only:

#### Start Frontend
```bash
cd event-hub-Main/frontend
npm start
```
This will start on http://localhost:5050

### With PostgreSQL (Full Setup)

#### Step 1: Database Setup
```bash
# Option A: If PostgreSQL is installed locally
psql -U postgres
CREATE DATABASE eventhub;
\q

# Option B: Using Docker
docker run --name eventhub-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:latest
```

#### Step 2: Backend Configuration
Update `backend/.env` with correct PostgreSQL password:
```env
DB_PASSWORD=postgres  # Your actual PostgreSQL password
```

#### Step 3: Start Services

**Terminal 1: Backend**
```bash
cd event-hub-Main/backend
node server.js
# Runs on http://localhost:8080
```

**Terminal 2: Frontend**
```bash
cd event-hub-Main/frontend
npm start
# Runs on http://localhost:5050
```

---

## Files Modified

### Backend Updates
1. **server.js**
   - Added database initialization
   - Auto-creates tables on startup
   - Changed default port to 3000 (use PORT env var)

2. **routes/auth.js**
   - Added email service integration
   - OTP now attempts to send email
   - OTP still logged to console for development

3. **services/emailService.js** (NEW)
   - Nodemailer integration
   - HTML email templates
   - Handles OTP and booking confirmations

### Frontend Updates
1. **auth/css/login.css**
   - Added popup styles
   - Success/error animations
   - Responsive design

2. **auth/js/login.js**
   - Shows success popup on login
   - Shows error popup on failure
   - Navigates to dashboard after popup

3. **auth/js/forgot-password.js**
   - OTP workflow functional
   - Sends email (or console logs)
   - Password reset working

---

## Testing Guide

### Test 1: Signup & Login with Popup
1. Open: http://localhost:5050/Public/auth/pages/signup.html
2. Fill form:
   - Name: John Doe
   - Mobile: 9876543210
   - Email: john@example.com
   - Role: explorer
   - Password: Test@123

3. Click Signup ✓

4. Open: http://localhost:5050/Public/auth/pages/login.html
5. Login:
   - Email: john@example.com
   - Password: Test@123

6. **Observe:**
   - ✅ Green "Login Successful!" popup appears
   - ✅ Message shows "Welcome back, John Doe!"
   - ✅ Redirects to Explorer Dashboard after 2 seconds

### Test 2: Login Error Popup
1. Login with:
   - Email: john@example.com
   - Password: wrong_password

2. **Observe:**
   - ✅ Red "Login Failed" popup appears
   - ✅ Shows error message: "Invalid credentials"
   - ✅ Stays visible for 4 seconds

### Test 3: Forgot Password OTP
1. Open: http://localhost:5050/Public/auth/pages/forgot-password.html
2. Enter: john@example.com
3. Click: "Send OTP"

4. **Check Backend Console:**
   - You should see: `OTP for john@example.com: 123456`

5. Enter OTP in form
6. Set new password
7. Click "Reset Password"

8. **Observe:**
   - ✅ Modal shows "Password reset successfully"
   - ✅ Redirects to login page
   - ✅ Can login with new password

### Test 4: Dashboard Navigation
1. Login as explorer
   - **Redirected to:** `/Public/explorer/pages/dashboard.html`
   - Shows event discovery interface

2. Login as organizer
   - **Redirected to:** `/Public/organizer/pages/dashboard.html`
   - Shows event management interface

### Test 5: Event Creation (Organizer)
1. Login as organizer
2. Go to "Create Event" tab
3. Fill:
   - Title: Tech Meetup 2026
   - Category: Technology
   - Date: 2026-02-20
   - Description: Learn modern web dev
   - Location: Bangalore
   - Price: 500
   - Seats: 50

4. Upload 3 photos
5. Click "Create Event"

6. **Observe:**
   - ✅ Success toast notification
   - ✅ Event appears in "My Events" tab
   - ✅ Photos displayed in carousel

### Test 6: Event Browsing (Explorer)
1. Login as explorer
2. Browse events displayed
3. Apply filters:
   - Search: "meetup"
   - Category: Technology
   - Date range
   - Price range

4. Click event card
5. View event details in modal:
   - Full description
   - Photo gallery
   - Organizer info
   - Available seats

6. Register for event
7. Proceed to payment

### Test 7: Payment Methods
1. After registration, go to payment
2. Try each method:
   - UPI (generates QR code)
   - Card (fake details work)
   - NetBanking
   - Google Pay
   - PhonePe
   - Paytm

3. **Observe:**
   - ✅ QR codes display for UPI/App payments
   - ✅ Form validation works
   - ✅ GST calculation (18%) correct
   - ✅ Total amount accurate

---

## Verification Checklist

### Database
- [ ] Tables created automatically on server start
- [ ] Users can be created and queried
- [ ] OTP stored in database with expiration
- [ ] Bookings and payments recorded

### Login System
- [ ] Signup works for both roles
- [ ] Login shows success popup
- [ ] Login error popup displays on failure
- [ ] Dashboard navigation based on role
- [ ] Token persisted in localStorage

### Forgot Password
- [ ] OTP sent (check console or email)
- [ ] OTP verification works
- [ ] Password reset succeeds
- [ ] Can login with new password

### Organizer Dashboard
- [ ] Create event works
- [ ] Multiple photo upload (5 max)
- [ ] Photo carousel displays
- [ ] View My Events works
- [ ] Analytics show correct stats

### Explorer Dashboard
- [ ] Events load from database
- [ ] Filtering works (category, date, price)
- [ ] Search works
- [ ] Event detail modal opens
- [ ] Registration form works

### Payment
- [ ] All 6 methods display
- [ ] QR generation works
- [ ] Form validation enforced
- [ ] GST calculated correctly
- [ ] Payment confirmation works

---

## Common Issues & Solutions

### Backend won't start: "password authentication failed"
```
Solution: Update .env with correct PostgreSQL password
DB_PASSWORD=your_actual_password
```

### "Cannot find module" errors
```
Solution: Reinstall packages
cd backend && npm install
cd frontend && npm install
```

### Frontend can't connect to backend
```
Solution: Check config.js
const CONFIG = {
  API_BASE_URL: 'http://localhost:8080',
  ...
};
```

### Port already in use
```
# Windows: Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Popups not showing
```
Solution: Clear localStorage and browser cache
localStorage.clear()
Hard refresh: Ctrl+Shift+R
```

---

## Development Tips

### Enable Debug Logging
Add to browser console:
```javascript
localStorage.setItem('DEBUG', 'true');
```

### View API Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Perform any action
4. See API calls and responses

### Check Session Token
```javascript
// In browser console
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
console.log('Token:', token);
console.log('User:', user);
```

### View Backend Logs
Check terminal where backend is running for:
- Database operations
- Authentication events
- OTP generation
- Error messages

---

## Next Steps

1. **Email Integration** (Optional)
   - Get Gmail App Password
   - Update EMAIL_USER and EMAIL_PASSWORD in .env
   - Restart backend
   - OTP will now send via email

2. **Payment Gateway** (Optional)
   - Integrate Razorpay or Stripe
   - Update payment processing logic
   - Enable real transactions

3. **Additional Features** (Optional)
   - Add reviews and ratings
   - Implement wishlist
   - Add notifications
   - Create admin dashboard

---

## Performance Tips

1. Clear browser cache if experiencing issues
2. Use incognito mode to test fresh login
3. Restart backend if database locks occur
4. Check browser console for JavaScript errors
5. Monitor backend console for API errors

---

**Happy Developing! 🚀**
