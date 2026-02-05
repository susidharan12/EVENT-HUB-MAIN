# EventHub - Quick Reference Guide

## 🚀 Start Here

### 1. Open Two Terminal Windows

#### Terminal 1: Start Backend
```bash
cd c:\Users\devil\OneDrive\Desktop\REACT-01\event-hub-Main\backend
npm start
```

#### Terminal 2: Start Frontend
```bash
cd c:\Users\devil\OneDrive\Desktop\REACT-01\event-hub-Main\frontend
npm start
```

### 2. Open Browser
Visit the URL shown in Terminal 2 (typically `http://127.0.0.1:5050`)

---

## 📌 Important URLs

| Page | URL |
|------|-----|
| Home | `/` |
| Login | `/Public/auth/pages/login.html` |
| Sign Up | `/Public/auth/pages/signup.html` |
| Forgot Password | `/Public/auth/pages/forgot-password.html` |
| Organizer Dashboard | `/Public/organizer/pages/dashboard.html` |
| Explorer Dashboard | `/Public/explorer/pages/dashboard.html` |
| Payment | `/Public/User/pages/payment.html` |

---

## 👥 User Roles

### Organizer
- Create events
- Upload photos
- View analytics
- Manage bookings
- Set bank details

### Explorer (User)
- Browse events
- Search & filter
- Register for events
- Process payments
- View bookings

---

## 🔑 Key Features at a Glance

### Login
✅ Email/Password authentication
✅ Automatic role-based redirect
✅ Session persistence

### Event Creation (Organizer)
✅ Event details form
✅ Multiple photo upload (up to 5)
✅ Category, date, price, seats

### Event Discovery (Explorer)
✅ Browse all events
✅ Search by name/location/description
✅ Filter by category, date, price
✅ View detailed event info

### Payment
✅ UPI with QR Code
✅ Credit/Debit Card
✅ Net Banking
✅ Google Pay, PhonePe, Paytm
✅ Automatic GST calculation

### Password Recovery
✅ Forgot password page
✅ OTP verification (6-digit)
✅ Password strength meter
✅ Step-by-step process

---

## 🧪 Test Scenarios

### Scenario 1: Sign Up as Organizer
1. Click "Sign up here" on login page
2. Fill form with:
   - Name: John Organizer
   - Mobile: 9999999999
   - Email: organizer@test.com
   - Password: Test@123
   - Role: Organizer
3. Create account
4. Redirected to Organizer Dashboard

### Scenario 2: Create Event
1. In Organizer Dashboard
2. Go to "Create Event" tab
3. Fill details:
   - Title: My First Event
   - Category: Technology
   - Date/Time: Select future date
   - Location: Your City
   - Price: 500
   - Seats: 100
4. Upload photos (click or drag)
5. Click "Create Event"
6. Check "My Events" tab to see created event

### Scenario 3: Browse & Register (As Explorer)
1. Sign up as Explorer
2. Browse events in dashboard
3. Use filters to find events
4. Click event card to see details
5. Select number of seats
6. Click "Register for Event"
7. Proceed to payment page

### Scenario 4: Reset Password
1. On login page, click "Reset here"
2. Enter registered email
3. Check backend console for OTP
4. Enter 6-digit OTP
5. Enter new password
6. Password reset complete
7. Login with new password

---

## 🎨 UI Color Codes

```css
Primary Blue: #3498db, #2980b9
Success Green: #27ae60, #229954
Danger Red: #e74c3c
Dark Text: #2c3e50
Light Text: #7f8c8d
Light BG: #f5f7fa, #ecf0f1
```

---

## 📊 API Endpoints

### Auth
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/profile
POST   /api/auth/send-otp
POST   /api/auth/verify-otp
POST   /api/auth/reset-password
```

### Events
```
GET    /api/events
POST   /api/events
GET    /api/events/:id
PUT    /api/events/:id
DELETE /api/events/:id
```

### Bookings
```
POST   /api/bookings
GET    /api/bookings/:id
```

### Payments
```
POST   /api/payments
```

---

## 🔐 Development Notes

### OTP Testing
- OTP is displayed in backend console during development
- OTP expires in 10 minutes
- Max 3 verification attempts
- Check Terminal 1 (backend) for OTP value

### Default Ports
- **Backend**: 3000 (or next available)
- **Frontend**: 5050 (or next available if taken)

### Token Storage
- JWT token stored in localStorage as `auth_token`
- User data stored as `auth_user`
- Auto-logout on token expiration

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | Change PORT in server.js |
| Can't reach backend | Check API.BASE_URL in config.js |
| Frontend not loading | Clear cache, hard refresh (Ctrl+Shift+R) |
| Login fails | Check email/password, verify DB connection |
| OTP not working | Check backend console, OTP expires in 10 min |
| Photos not uploading | Check file size, browser support |
| Payment page shows nothing | Check booking_id in URL |

---

## 📁 Important File Locations

### Config
- `frontend/Public/js/config.js` - API URLs, settings

### Services
- `frontend/Public/js/services/api.js` - API communication
- `frontend/Public/js/services/auth.js` - Authentication
- `frontend/Public/js/services/dashboard.js` - Navigation
- `frontend/Public/js/services/payment.js` - Payment processing

### Dashboards
- `frontend/Public/organizer/pages/dashboard.html` - Organizer
- `frontend/Public/explorer/pages/dashboard.html` - Explorer

### Authentication
- `frontend/Public/auth/pages/login.html` - Login page
- `frontend/Public/auth/pages/forgot-password.html` - Password reset

### Backend
- `backend/server.js` - Main server file
- `backend/routes/auth.js` - Auth endpoints

---

## ✅ Verification Steps

After starting servers, verify:

1. **Backend Running**
   - Terminal 1 shows "Server running"
   - Port 3000 is listening

2. **Frontend Running**
   - Terminal 2 shows "Ready for changes"
   - Frontend URL is provided

3. **Can Access Site**
   - Open browser to frontend URL
   - Login page loads
   - No console errors

4. **Can Sign Up**
   - Fill signup form
   - Account created successfully
   - Redirects to dashboard

5. **Can Create Event** (Organizer)
   - Event form loads
   - Can upload photos
   - Event appears in My Events

6. **Can Browse Events** (Explorer)
   - Events load in grid
   - Filters work
   - Can open event details

---

## 💡 Pro Tips

1. **Use Organizer & Explorer Accounts**
   - Test both workflows
   - See different dashboards

2. **Test All Filters**
   - Category, date, price
   - Search functionality

3. **Try Payment Methods**
   - View QR codes
   - Check form validation

4. **Check Responsive Design**
   - Resize browser window
   - Test on mobile screen size

5. **Monitor Console**
   - Browser DevTools F12
   - Backend terminal
   - Check for errors

---

## 🎯 Learning Path

1. **First Time**: Sign up and explore
2. **As Organizer**: Create an event with photos
3. **As Explorer**: Find and register for event
4. **Payment**: Complete payment process
5. **Security**: Test forgot password flow

---

## 📞 Getting Help

- Check browser console for errors: **F12**
- Check backend terminal for logs: **Terminal 1**
- Read error messages carefully
- Check API responses in Network tab
- Refer to documentation files in root

---

## 🎉 You're Ready!

Everything is set up. Now:
1. Start both servers
2. Open the frontend URL
3. Sign up and explore
4. Test all features
5. Enjoy EventHub!

**Happy Event Management! 🚀**
