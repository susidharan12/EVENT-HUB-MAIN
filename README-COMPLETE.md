# EventHub - Complete Event Management System

A full-stack event management platform with real-time chat, booking system, and comprehensive admin panel.

## 🚀 Features Completed

### ✅ Backend Features
- **Database Integration**: PostgreSQL with proper schema
- **Event Management**: Create, read, update, delete events
- **User Authentication**: JWT-based auth with role management
- **Chat System**: Real-time messaging between users and organizers
- **File Upload**: Event cover image upload support
- **API Documentation**: Swagger/OpenAPI documentation

### ✅ Frontend Features
- **User Dashboard**: Browse and search all events
- **Organizer Dashboard**: Manage events with enhanced UI
- **Event Details**: Detailed event view with chat functionality
- **Chat System**: Real-time communication between users and organizers
- **Responsive Design**: Mobile-friendly interface
- **Authentication**: Login/signup with role-based access

### ✅ Key Improvements Made
1. **Fixed Database Storage**: Events now properly save to PostgreSQL
2. **Enhanced Create Event UI**: Beautiful, intuitive form with file upload
3. **Chat System**: Complete messaging system between users and organizers
4. **Event Display**: All created events show to normal users
5. **Edit Functionality**: Organizers can edit their events
6. **Real-time Updates**: Dynamic loading of events and messages

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Git

### 1. Database Setup
```sql
-- Create database
CREATE DATABASE eventhub;

-- The application will automatically create tables on first run
```

### 2. Backend Setup
```bash
cd "backend - Copy"
npm install
```

Create `.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventhub
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup
```bash
cd "frontend - Copy"
npm install
```

### 4. Quick Start
Run the startup script:
```bash
start-project.bat
```

Or manually:
```bash
# Terminal 1 - Backend
cd "backend - Copy"
npm start

# Terminal 2 - Frontend
cd "frontend - Copy"
npx live-server --port=8001 --host=localhost --open=/Public/User/pages/dashboard.html
```

## 🌐 Access Points

- **User Dashboard**: http://localhost:8001/Public/User/pages/dashboard.html
- **Organizer Dashboard**: http://localhost:8001/Public/organizer/pages/dashboard.html
- **Admin Panel**: http://localhost:8001/Public/Admin/pages/index.html
- **Login**: http://localhost:8001/Public/auth/pages/login.html
- **API Documentation**: http://localhost:3000/api-docs

## 👥 User Roles

### 1. Explorer (Normal User)
- Browse all events
- View event details
- Chat with event organizers
- Book tickets
- View booking history

### 2. Organizer
- Create and manage events
- Edit event details
- Chat with event attendees
- View booking analytics
- Upload event images

### 3. Admin
- Manage all events
- User management
- System analytics
- Payment management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Events
- `GET /api/events` - Get all events (public)
- `POST /api/events` - Create event (organizer only)
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event (organizer only)
- `DELETE /api/events/:id` - Delete event (organizer only)
- `GET /api/events/my-events` - Get organizer's events
- `GET /api/events/count` - Get event count for organizer

### Chat
- `GET /api/events/:id/messages` - Get chat messages
- `POST /api/events/:id/messages` - Send message

## 💬 Chat System

### For Users
1. Browse events on the dashboard
2. Click "View Details" on any event
3. Scroll down to the chat section
4. Login required to send messages
5. Must have a booking to chat with organizer

### For Organizers
1. Go to organizer dashboard
2. Navigate to "Messages" section
3. Select an event from dropdown
4. Chat with users who have bookings

## 🎨 UI Enhancements

### Create Event Form
- Modern card-based design
- Icon-enhanced form fields
- Drag-and-drop file upload area
- Better category selection
- Improved validation and feedback

### Dashboard Improvements
- Clean, professional layout
- Real-time event statistics
- Enhanced event cards with edit/delete actions
- Responsive grid layout
- Smooth animations and transitions

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Input validation and sanitization
- SQL injection prevention
- File upload security

## 📱 Mobile Responsive

All pages are fully responsive and work seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment Ready

The application is structured for easy deployment:
- Environment-based configuration
- Docker support (Dockerfile included)
- Production-ready error handling
- Logging and monitoring setup

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Events Not Saving**
   - Check backend logs for errors
   - Verify JWT token is valid
   - Ensure user has organizer role

3. **Chat Not Working**
   - User must be logged in
   - User must have booking for the event
   - Check network connectivity

4. **File Upload Issues**
   - Check uploads directory exists
   - Verify file size limits
   - Ensure proper file permissions

## 📞 Support

For technical support or questions:
1. Check the API documentation at `/api-docs`
2. Review browser console for errors
3. Check backend server logs
4. Verify database connections

## 🎯 Next Steps

The application is now complete with all requested features:
- ✅ Database storage for events
- ✅ Enhanced create event UI
- ✅ Chat system between users and organizers
- ✅ Event editing functionality
- ✅ All events visible to users
- ✅ Complete project integration

The system is ready for production use with proper database setup and deployment configuration.