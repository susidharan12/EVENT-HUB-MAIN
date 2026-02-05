# EventHub - Event Management Platform

A modern, full-stack event management platform that connects event organizers with attendees. Built with Node.js, Express, PostgreSQL, and vanilla JavaScript.

## 🚀 Features

### Core Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Two User Roles**: 
  - **Organizers**: Can create, manage, and publish events
  - **Explorers**: Can discover, book, and attend events
- **Event Management**: Create, edit, and manage event listings
- **Booking System**: Real-time seat availability and booking confirmation
- **Payment Processing**: Secure payment tracking and history
- **Check-in System**: QR code-based event check-in
- **Admin Dashboard**: Comprehensive organizer panel for event management

### Enhanced Features (New)
- **Advanced Search & Filtering**:
  - Search by event name, location, and category
  - Filter by category (Concert, Tech Talk, Workshop, Cultural, Sports)
  - Price range filter
  - Smart sorting (Upcoming, Price Low-to-High, Price High-to-Low, Most Popular)
- **Modern, Responsive UI**:
  - Beautiful gradient backgrounds
  - Glassmorphism effects
  - Smooth animations and transitions
  - Mobile-optimized design
- **Real-time Event Counts**: Shows number of filtered events
- **Event Categories**: Organized event browsing
- **User Profile Management**: View and update user information
- **Booking History**: Track all past bookings

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (v12 or higher)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EventHub-Event-Management-main
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE eventhub_db;
```

Initialize the schema:
```bash
psql -U postgres -d eventhub_db -f database/schema.sql
```

### 4. Environment Configuration

Create `.env` file in the `backend` folder:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eventhub_db
NODE_ENV=development

# Server Configuration
PORT=3000
HOST=127.0.0.1

# JWT Secret (Change in production!)
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345

# OTP Configuration
OTP_SECRET=your_otp_secret_key_12345

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on: **http://127.0.0.1:3000**

### Start Frontend Server
```bash
cd frontend
npm start
```
Frontend will run on: **http://127.0.0.1:56519** (or another available port)

## 📱 Usage Guide

### For Event Explorers
1. Visit the home page
2. Click "Sign Up" and register as an "Event explorer"
3. Browse events with advanced filters
4. Click on an event to view details
5. Book tickets and proceed to payment
6. Receive booking confirmation and QR code
7. Check in at the event using your QR code

### For Event Organizers
1. Sign up as an "Organizer"
2. Log in and go to the Admin Dashboard
3. Create new events with details and images
4. Manage bookings and view attendee information
5. Set up payment details for receiving funds
6. Track event performance and attendance

## 🎨 UI Improvements Made

### Home Page
- Modern gradient background (purple to pink)
- Animated hero section with smooth transitions
- Glassmorphism effects for cards
- Responsive feature cards with icons
- Smooth scroll navigation

### Authentication Pages (Login/Signup)
- Clean, centered card design
- Modern gradient styling
- Improved form controls with focus effects
- Better error/success message display
- Mobile-responsive layout

### Dashboard
- Enhanced event filtering with multiple options
- Real-time search functionality
- Price range slider
- Category filters with emojis
- Smart sorting options
- Events count display
- Responsive grid layout

### General UI
- Consistent color scheme throughout
- Smooth hover effects
- Rounded modern buttons
- Better spacing and typography
- Improved accessibility

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/send-otp` - Send OTP to mobile

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event (organizer only)
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event (organizer only)
- `DELETE /api/events/:id` - Delete event (organizer only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/checkin` - Check in to event
- `GET /api/bookings/:id/checkins` - Get check-ins for booking

### Payments
- `POST /api/payments` - Record payment
- `GET /api/payments` - Get payment history
- `POST /api/payments/organizer/details` - Set organizer bank details
- `GET /api/payments/organizer/details` - Get organizer bank details

## 📁 Project Structure

```
EventHub-Event-Management-main/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── bookings.js
│   │   └── payments.js
│   ├── scripts/
│   │   └── seed.js
│   ├── .env
│   ├── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── Public/
│   │   ├── Admin/ - Admin dashboard pages
│   │   ├── auth/ - Login/Signup pages
│   │   ├── User/ - User dashboard pages
│   │   ├── css/ - Global styles
│   │   ├── js/ - JavaScript services and utilities
│   │   └── services/ - API and auth services
│   ├── index.html - Home page
│   └── package.json
├── database/
│   └── schema.sql - Database schema
└── README.md
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS configuration
- Environment variable protection
- Secure database connections

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- PostgreSQL
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Live Server for development
- Responsive design
- Service-based architecture

## 📝 Database Schema

- **users** - User accounts (organizers and explorers)
- **events** - Event listings
- **bookings** - Event bookings/registrations
- **checkins** - Event attendance check-ins
- **payments** - Payment records
- **organizer_payments** - Organizer bank details

## 🚦 Troubleshooting

### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### Database Connection Error
- Ensure PostgreSQL is running
- Verify DATABASE_URL in .env file
- Check database credentials

### CORS Issues
- Check CORS configuration in backend/server.js
- Ensure frontend URL is whitelisted

## 📊 Future Enhancements

- Email notifications
- Advanced analytics dashboard
- Refund processing system
- Rating and review system
- Social media integration
- Mobile app
- Event recommendations
- Wishlist feature

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions, please create an issue in the repository or contact the team at support@eventhub.com

---

**Happy Event Organizing!** 🎉
