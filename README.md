# SkillUp - Online Learning Platform

A modern, responsive online learning platform with comprehensive course management, user authentication, and an intuitive dashboard. Built with clean HTML, CSS, and JavaScript, structured for easy React expansion.

## Features

### Frontend
- **Homepage**: Hero section, features showcase, and popular courses
- **Course Catalog**: Search and filter functionality with category and level filters
- **Course Detail Pages**: Comprehensive course information with enrollment capability
- **User Authentication**: Registration and login pages with JWT-based authentication
- **User Dashboard**: Personalized dashboard showing enrolled courses and progress tracking
- **Responsive Design**: Mobile-first approach with modern UI components

### Backend
- **REST API**: Express.js server with organized routes
- **Authentication**: JWT-based user authentication with bcrypt password hashing
- **Course Management**: CRUD operations for courses and enrollments
- **In-Memory Storage**: Ready for database integration

## Project Structure

```
skillup-web/
├── backend/
│   ├── server.js              # Main Express server
│   ├── package.json           # Backend dependencies
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/
│   │   ├── User.js           # User data model
│   │   └── Course.js         # Course data model with sample data
│   └── routes/
│       ├── auth.js           # Authentication endpoints
│       ├── courses.js        # Course endpoints
│       └── enrollments.js    # Enrollment endpoints
└── frontend/
    ├── index.html            # Homepage
    ├── courses.html          # Course catalog
    ├── course-detail.html    # Individual course page
    ├── login.html            # Login page
    ├── register.html         # Registration page
    ├── dashboard.html        # User dashboard
    ├── css/
    │   └── styles.css        # Global styles with CSS variables
    └── js/
        ├── api.js            # API service layer
        ├── auth.js           # Authentication helpers
        ├── home.js           # Homepage functionality
        ├── courses.js        # Course catalog functionality
        ├── course-detail.js  # Course detail page functionality
        └── dashboard.js      # Dashboard functionality
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillup-web
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: { user }
```

### Course Endpoints

#### Get All Courses
```
GET /api/courses?category=<category>&level=<level>&search=<query>

Response: { courses, total }
```

#### Get Course by ID
```
GET /api/courses/:id

Response: { course }
```

### Enrollment Endpoints

#### Enroll in Course
```
POST /api/enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "1"
}

Response: { message, enrollment }
```

#### Get Enrolled Courses
```
GET /api/enrollments/my-courses
Authorization: Bearer <token>

Response: { courses }
```

#### Unenroll from Course
```
DELETE /api/enrollments/:courseId
Authorization: Bearer <token>

Response: { message }
```

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)**: Modular, component-based structure
- **Fetch API**: For HTTP requests

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **JWT (jsonwebtoken)**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## Development Notes

### Code Structure for React Migration
The JavaScript code is structured with React migration in mind:
- Component-based organization
- Centralized state management patterns
- Separated API service layer
- Reusable helper functions

### Security Considerations
- Passwords are hashed using bcrypt before storage
- JWT tokens for secure authentication
- CORS enabled for API access
- Environment variables should be used for production secrets

### Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- Real-time progress tracking
- Video content support
- Payment integration
- Social features (reviews, comments)
- Email notifications
- Admin panel
- Advanced analytics

## Contributing
This is a learning platform project. Contributions are welcome!

## License
MIT License

## Contact
For questions or support, contact: info@skillup.com
