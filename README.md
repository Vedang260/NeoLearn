# NeoLearn - Online Course Enrollment System 🚀

![image](https://github.com/user-attachments/assets/f6a030b5-8917-4304-8a06-91e334c61d7e)

**NeoLearn** is a modern online learning platform where students can enroll in courses and track their progress, while instructors can create and manage courses. Built with cutting-edge technologies for seamless user experience.

## 🌟 Features

### 👨‍🎓 Student Features
- 📝 Enroll in courses
- 📊 Track progress with visual analytics
- � Mark lessons as completed
- 🔔 Notifications for new content/deadlines

### 👨‍🏫 Instructor Features
- ➕ Create and publish new courses
- 📑 Manage course content (videos, quizzes, assignments)
- ✏️ Edit course details

### 🛠️ Admin Features
- 👥 User management
- 🏷️ Course categorization
- 📊 Platform analytics dashboard
- ⚙️ System configuration

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18
- 📜 TypeScript
- 🔄 Redux Toolkit (State Management)
- 🎨 Material UI (v5) + Custom Theme
- ✨ Framer Motion (Animations)
- 📢 React Toastify (Notifications)
- 📱 Fully Responsive Design
- 📡 Axios for API calls

### Backend
- 🏗️ NestJS Framework
- � Node.js 18+
- 🐘 PostgreSQL (Database)
- 🔑 JWT Authentication
- 🛡️ Passport.js (Role-based Authorization)
- � TypeORM (Database ORM)


## Setup Instructions
 
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
 
### Backend Setup
 
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
 
2. Install dependencies:
   ```bash
   npm install
   ```
 
3. Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=neoLearn
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1h
   ```
 
4. Start the development server:
   ```bash
   npm run start:dev
   ```
 
5. The backend API will be available at http://localhost:8000
 
 
### Frontend Setup
 
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
 
2. Install dependencies:
   ```bash
   npm install
   ```
 
3. The frontend application will be available at http://localhost:3000
 
 
## API Documentation
 
The complete API documentation is available on Postman:
[Neo Learn API Documentation](https://documenter.postman.com/preview/26606017-fad33221-4132-4b88-bee8-257ff9e42c08?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&documentationTheme=light&logo=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&logoDark=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&right-sidebar=303030&top-bar=FFFFFF&highlight=FF6C37&right-sidebar-dark=303030&top-bar-dark=212121&highlight-dark=FF6C37)
 
 
# 📽️ Neo Learn - Demo Video  
 
Watch the demo of the **Neo Learn**:  
🔗 **[Click here to watch the demo](https://drive.google.com/file/d/1JWhGX_7mdwq6PhS3va5LNWlS9uZot83M/view?usp=sharing)**  
