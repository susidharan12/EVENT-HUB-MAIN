# Complete Authentication Testing Guide

## 🎯 Authentication Flow Overview

```
User visits signup.html
       ↓
Fills in Name, Email, Mobile, Role, Password
       ↓
Submits form → Frontend validation
       ↓
API calls /auth/signup endpoint → Backend saves to PostgreSQL
       ↓
Backend returns token + user data
       ↓
Frontend stores in localStorage
       ↓
Redirects to login.html
       ↓
User fills in Email & Password
       ↓
Selects role (Organizer or Normal User)
       ↓
Submits form → Frontend validation
       ↓
API calls /auth/login endpoint → Backend verifies email+password
       ↓
Backend queries PostgreSQL database
       ↓
Returns token + user data
       ↓
Frontend verifies selected role matches database role
       ↓
Stores token in localStorage
       ↓
Redirects to appropriate dashboard:
   • Organizer → /organizer/pages/dashboard.html
   • Normal User → /User/pages/dashboard.html
```

---

## 📋 Console Logging

The system logs all authentication steps to the browser console:

### Frontend Console (Browser DevTools)

When you signup or login, you'll see logs like:

```
📝 === SIGNUP REQUEST === (Backend)
📧 Email: john@example.com
🔑 Password length: 8
🔍 Checking if user already exists...
✅ User does not exist, proceeding with registration...
🔐 Hashing password...
✅ Password hashed successfully
💾 Inserting user into database...
✅ User inserted successfully
User details: {id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", role: "organizer"}
🎟️ Generating JWT token...
✅ Token generated successfully

✅ === SIGNUP SUCCESSFUL ===
Timestamp: 2026-02-05T10:30:45.123Z
================
```

### Login Console Output

```
🔐 Login attempt started
📧 Email: john@example.com
🔑 Password length: 8
🔄 Sending login request to backend...

📡 [ApiService] Sending login request to: http://127.0.0.1:3000/api/auth/login
   Email: john@example.com

🔐 [AuthService] Login initiated for: john@example.com

🔐 === LOGIN REQUEST === (Backend)
📧 Email: john@example.com
🔑 Password length: 8
🔍 Querying database for user by email...
📊 Database query result: 1 user(s) found
👤 User found in database: {id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", role: "organizer"}
🔐 Comparing password hashes...
✓ Password verification: MATCH ✅
🎟️ Generating JWT token...
✅ Token generated successfully
⏱️ Token expiry: 7 days

✅ === LOGIN SUCCESSFUL ===
User: {id: 1, name: "John Doe", email: "john@example.com", role: "organizer", mobile: "1234567890"}
Timestamp: 2026-02-05T10:35:20.456Z
================

📥 [ApiService] Backend response received
   Status: Success
   User ID: 1
   User Name: John Doe
   User Role: organizer
   User Email: john@example.com
   Token present: true

✅ [ApiService] Auth data saved locally

🔐 [AuthService] Login initiated for: john@example.com
📤 [AuthService] Making API request to backend...
📥 [AuthService] Backend response: {token: "eyJhbGc...", user: {...}}
💾 [AuthService] Saving to localStorage...
   - Token: eyJhbGc...
   - User: {id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", role: "organizer"}
✅ [AuthService] Login successful!
🎯 User role: organizer

👤 Current user loaded: {id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", role: "organizer"}
🎯 Selected role: organizer
🎯 User role: organizer
✅ Role validated successfully
💾 User data stored in localStorage
📊 Auth token: eyJhbGc...
🚀 Redirecting to dashboard...
➡️ Redirecting to organizer dashboard
```

---

## 🗄️ Database Storage

After signup or login, user data is stored in PostgreSQL:

```sql
-- Check all users in database
SELECT * FROM users;

-- Expected output:
id |   name   |   email   |  mobile  |      password_hash       |    role    |     created_at
---+----------+-----------+----------+--------------------------+------------+-------------------
 1 | John Doe | john@... | 1234567890 | $2a$10$abcde... | organizer | 2026-02-05 10:30:45

-- Verify specific user
SELECT id, name, email, mobile, role FROM users WHERE email = 'john@example.com';
```

---

## 🧪 Testing Steps

### Step 1: Start Backend Server

```bash
cd "backend - Copy"
npm install  # (if needed)
npm start
```

Expected output:
```
✅ PostgreSQL connected
   Host: localhost
   Database: eventhub
   User: postgres
   Port: 5432
✅ Server running on http://localhost:3000
```

### Step 2: Start Frontend (same port)

```bash
cd "frontend - Copy"
npm start
```

### Step 3: Test Signup

1. Navigate to: `http://localhost:8080/Public/auth/pages/signup.html`
2. Fill form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Mobile**: 1234567890
   - **Role**: Organizer
   - **Password**: password123
   - **Confirm**: password123
3. Click "Submit"
4. **Check Console** (F12): You should see the signup logs above
5. **Check Database**: 
   ```sql
   SELECT * FROM users WHERE email = 'john@example.com';
   ```
   Should return the user record.

### Step 4: Test Login

1. Navigate to: `http://localhost:8080/Public/auth/pages/login.html`
2. Fill form:
   - **Email**: john@example.com
   - **Password**: password123
3. Click "Organizer" role button (must match signup role)
4. Click "Login Now"
5. **Check Console**: You should see login logs above
6. **Check localStorage** (Console):
   ```javascript
   // In browser console, type:
   localStorage.getItem('auth_token')      // Should return token
   localStorage.getItem('auth_user')       // Should return user object
   
   // Parse and view user:
   JSON.parse(localStorage.getItem('auth_user'))
   // Output: {id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", role: "organizer"}
   ```
7. Should redirect to organizer dashboard

### Step 5: Test Role Mismatch

1. On login page, try:
   - **Email**: john@example.com
   - **Password**: password123
   - Select **Normal User** role (instead of Organizer)
2. Click "Login Now"
3. Should show error: "Account is registered as ORGANIZER. Please select the correct role above."

### Step 6: Test Wrong Password

1. On login page:
   - **Email**: john@example.com
   - **Password**: wrongpassword
2. Click "Login Now"
3. Should show error: "Invalid credentials"

### Step 7: Test Non-existent User

1. On login page:
   - **Email**: nonexistent@example.com
   - **Password**: password123
2. Click "Login Now"
3. Should show error: "User not found"

---

## 📊 What Gets Stored Where

### Browser localStorage (Frontend)
```javascript
{
  "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "auth_user": "{\"id\":1,\"name\":\"John Doe\",\"email\":\"john@example.com\",\"mobile\":\"1234567890\",\"role\":\"organizer\"}"
}
```

### PostgreSQL Database (Backend)
```sql
Table: users
┌────┬──────────┬─────────────────┬────────────┬──────────────────────────────┬───────────┬──────────────────┐
│ id │   name   │     email       │   mobile   │      password_hash           │   role    │    created_at    │
├────┼──────────┼─────────────────┼────────────┼──────────────────────────────┼───────────┼──────────────────┤
│ 1  │ John Doe │ john@example... │ 1234567890 │ $2a$10$abcdefghijklmnop...   │ organizer │ 2026-02-05 10:30 │
└────┴──────────┴─────────────────┴────────────┴──────────────────────────────┴───────────┴──────────────────┘
```

---

## 🔍 Troubleshooting

### Issue: "Cannot POST /api/auth/login"
- **Cause**: Backend not running or port wrong
- **Fix**: Start backend with `npm start` in backend directory

### Issue: "Network error"
- **Cause**: Frontend/Backend not connected
- **Fix**: Make sure both on localhost:3000 and localhost:8080

### Issue: "Password must be at least 6 characters"
- **Cause**: Password too short
- **Fix**: Use at least 6 character password

### Issue: User not found after signup
- **Cause**: Database error during signup
- **Fix**: Check PostgreSQL is running and user was actually inserted:
  ```sql
  SELECT * FROM users;
  ```

### Issue: Role mismatch error on login
- **Cause**: You selected wrong role
- **Fix**: Click the role button that matches the signup role

---

## 📝 File Locations

**Frontend Files**:
- Signup: `frontend - Copy/Public/auth/pages/signup.html`
- Login: `frontend - Copy/Public/auth/pages/login.html`
- Auth Service: `frontend - Copy/Public/js/services/auth.js`
- API Service: `frontend - Copy/Public/js/services/api.js`

**Backend Files**:
- Auth Controller: `backend - Copy/controllers/authController.js`
- Auth Routes: `backend - Copy/routes/auth.js`
- Database: `backend - Copy/db.js`

**Database**:
- Schema: `database - Copy/schema.sql`
- PostgreSQL required on localhost:5432
