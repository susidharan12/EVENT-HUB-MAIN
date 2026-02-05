# Quick Start - Testing Authentication

## Prerequisites

1. **PostgreSQL** running on localhost:5432
2. **Backend** running on http://localhost:3000
3. **Frontend** running on http://localhost:8080 (or your Live Server port)

## Setup Backend

```bash
cd "backend - Copy"
npm install
# Create .env file with:
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=eventhub
# JWT_SECRET=your_secret_key

npm start
# Should show: ✅ Server running on http://localhost:3000
```

## Test Signup

1. Navigate to: `http://localhost:8080/frontend - Copy/Public/auth/pages/signup.html`
2. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com (must be unique)
   - **Mobile**: 1234567890
   - **Role**: Select either "Organizer" or "Event explorer"
   - **Password**: password123
   - **Confirm Password**: password123
3. Click "Submit"
4. Should see: "Account created successfully! Redirecting..."
5. Should redirect to login page
6. ✅ Check PostgreSQL database:
   ```sql
   SELECT * FROM users WHERE email = 'john@example.com';
   ```

## Test Login

1. Navigate to: `http://localhost:8080/frontend - Copy/Public/auth/pages/login.html`
2. Fill in the form:
   - **Email**: john@example.com (from signup above)
   - **Password**: password123
3. Select the same role you used during signup
4. Click "Login Now"
5. Should redirect to appropriate dashboard:
   - **Organizer** → `/organizer/pages/dashboard.html`
   - **Explorer** → `/explorer/pages/dashboard.html`

## Common Issues & Solutions

### Issue: "Invalid credentials" error on login
- **Cause**: Wrong email or password
- **Fix**: Double-check the email and password match what was used in signup

### Issue: "This account is registered as ORGANIZER..."
- **Cause**: You selected the wrong role during login
- **Fix**: Click the correct role button and try again

### Issue: Network error / Cannot reach server
- **Cause**: Backend not running
- **Fix**: Start backend with `npm start` in backend directory

### Issue: Database connection error
- **Cause**: PostgreSQL not running or .env variables wrong
- **Fix**: 
  - Verify PostgreSQL is running: `psql -U postgres`
  - Check .env file has correct credentials
  - Ensure database exists: `createdb eventhub`

---

## Database Verification

Check if user was created:
```sql
-- Connect to your database
psql -U postgres -d eventhub

-- View all users
SELECT id, name, email, mobile, role, created_at FROM users;

-- View specific user
SELECT * FROM users WHERE email = 'john@example.com';
```

## Expected Flow

1. **User creates account** → Signup page saves to users table
2. **User logs in** → Backend verifies email & password
3. **Token generated** → Sent to frontend and stored in localStorage
4. **User redirected** → To appropriate dashboard based on role
5. **Dashboard loads** → Can create/view events based on role
