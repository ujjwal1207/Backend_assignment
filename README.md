# Scalable REST API with Authentication & Role-Based Access# Scalable REST API with Authentication & Role-Based Access



A production-ready backend API system with JWT authentication, role-based access control (RBAC), and a simple React frontend for testing and demonstration.A production-ready backend system with JWT authentication, role-based access control, and CRUD operations for task management.



**🎓 Backend Developer Intern Assignment**## 🚀 Tech Stack



---### Backend

- **Node.js** + **Express.js** - Web framework

## 🚀 Tech Stack- **MongoDB Atlas** - Cloud database (NoSQL)

- **Mongoose** - ODM for MongoDB

### Backend- **Redis** - Caching layer

- **Node.js** + **Express.js** - RESTful API framework- **JWT** - Authentication

- **MongoDB Atlas** - Cloud NoSQL database- **Bcrypt** - Password hashing

- **Mongoose** - MongoDB ODM- **express-validator** - Input validation

- **Redis** - Caching layer for performance- **Swagger** - API documentation

- **JWT** - Stateless authentication- **Winston** - Logging

- **Bcrypt** - Password hashing

- **express-validator** - Input validation### Frontend

- **Swagger** - API documentation- **React.js** - UI framework

- **Winston** - Logging- **Axios** - HTTP client

- **React Router** - Navigation

### Frontend- **TailwindCSS** - Styling

- **React.js** - UI framework

- **React Router** - Client-side routing## 📁 Project Structure

- **Axios** - HTTP client

- **Context API** - State management```

backend-assignment/

### DevOps├── backend/

- **Docker** & **Docker Compose** - Containerization│   ├── src/

- **ESLint** - Code quality│   │   ├── config/         # Configuration files

│   │   ├── controllers/    # Route controllers

---│   │   ├── middleware/     # Custom middleware

│   │   ├── models/         # Database models

## 📁 Project Structure│   │   ├── routes/         # API routes

│   │   ├── services/       # Business logic

```│   │   ├── utils/          # Utility functions

backend-assignment/│   │   ├── validators/     # Input validation schemas

├── backend/                    # Node.js Backend API│   │   └── app.js          # Express app setup

│   ├── src/│   ├── migrations/         # Database migrations

│   │   ├── config/            # Database, Redis configuration│   ├── tests/              # Test files

│   │   ├── controllers/       # Request handlers│   └── server.js           # Entry point

│   │   ├── middleware/        # Auth, validation, error handling├── frontend/

│   │   ├── models/            # Mongoose schemas (User, Task)│   ├── src/

│   │   ├── routes/            # API endpoints│   │   ├── components/     # React components

│   │   ├── services/          # Business logic│   │   ├── services/       # API services

│   │   ├── utils/             # Helpers (JWT, logger, etc.)│   │   ├── context/        # Context providers

│   │   └── validators/        # Input validation rules│   │   └── App.js

│   ├── .env                   # Environment variables│   └── public/

│   ├── server.js              # Entry point├── docker-compose.yml

│   └── package.json└── README.md

├── frontend/                  # React Frontend```

│   ├── src/

│   │   ├── components/        # UI components## 🔧 Setup Instructions

│   │   ├── context/           # Auth context

│   │   └── services/          # API service### Prerequisites

│   └── package.json- Node.js (v18+)

├── docker-compose.yml         # Multi-container setup- MongoDB Atlas account (free tier available)

├── Postman_Collection.json    # API testing collection- Redis (v7+)

├── SCALABILITY.md             # Scalability notes- Docker & Docker Compose (optional)

└── README.md

```### Option 1: Docker Setup (Recommended)



---```bash

# Clone the repository

## 🔧 Setup & Installationgit clone <your-repo-url>

cd backend-assignment

### Prerequisites

- Node.js (v18+)# Start all services with Docker

- MongoDB Atlas account (free tier)docker-compose up -d

- Redis (v7+) or use Docker

- Git# Backend will run on: http://localhost:5000

# Frontend will run on: http://localhost:3000

### Quick Start with Docker (Recommended)# API Docs: http://localhost:5000/api-docs

```

```bash

# Clone repository### Option 2: Manual Setup

git clone <your-repo-url>

cd backend-assignment#### Backend Setup



# Start all services```bash

docker-compose up -dcd backend



# Access the application# Install dependencies

# Frontend: http://localhost:3000npm install

# Backend API: http://localhost:5000

# API Docs: http://localhost:5000/api-docs# Create .env file

```cp .env.example .env



### Manual Setup# Update .env with your database credentials



#### 1. Backend Setup# Run migrations

npm run migrate

```bash

cd backend# Start development server

npm run dev

# Install dependencies```

npm install

#### Frontend Setup

# Create .env file (use .env.example as template)

# Update MONGODB_URI with your MongoDB Atlas connection string```bash

cd frontend

# Create admin user

npm run migrate# Install dependencies

npm install

# Start development server

npm run dev# Create .env file

```cp .env.example .env



#### 2. Frontend Setup# Start development server

npm run dev  # alias: npm start

```bash```

cd frontend

## 🔑 Environment Variables

# Install dependencies

npm install### Backend (.env)



# Start development server```env

npm run devNODE_ENV=development

```PORT=5000



---# MongoDB Atlas

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/backend_assignment?retryWrites=true&w=majority

## 🔑 Environment Variables

# Redis

### Backend (.env)REDIS_HOST=localhost

```envREDIS_PORT=6379

NODE_ENV=developmentREDIS_PASSWORD=

PORT=5000

# JWT

# MongoDB Atlas ConnectionJWT_SECRET=your-super-secret-jwt-key-change-this-in-production

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/backend_assignment?retryWrites=true&w=majorityJWT_EXPIRE=7d



# Redis Cache# API

REDIS_HOST=localhostAPI_VERSION=v1

REDIS_PORT=6379RATE_LIMIT_WINDOW=15

RATE_LIMIT_MAX=100

# JWT Configuration```

JWT_SECRET=your-super-secret-jwt-key-change-in-production

JWT_EXPIRE=7d**MongoDB Atlas Setup:**

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

# API Configuration2. Create a cluster

API_VERSION=v13. Add database user

RATE_LIMIT_WINDOW=154. Whitelist your IP address

RATE_LIMIT_MAX=1005. Get connection string

CORS_ORIGIN=http://localhost:30006. Replace `<username>`, `<password>`, and cluster URL in `MONGODB_URI`

```

See [MONGODB_MIGRATION.md](MONGODB_MIGRATION.md) for detailed setup instructions.

### Frontend (.env)

```env### Frontend (.env)

REACT_APP_API_BASE_URL=http://localhost:5000/api/v1

``````env

REACT_APP_API_BASE_URL=http://localhost:5000/api/v1

---```



## 📚 API Documentation## 📚 API Documentation



### Base URL### Base URL: `http://localhost:5000/api/v1`

```

http://localhost:5000/api/v1### Interactive Docs: `http://localhost:5000/api-docs`

```

### Authentication Endpoints

### Interactive Documentation

```#### Register User

http://localhost:5000/api-docs (Swagger UI)```http

```POST /auth/register

Content-Type: application/json

### Authentication Endpoints

{

#### Register User  "name": "John Doe",

```http  "email": "john@example.com",

POST /auth/register  "password": "SecurePass123!"

Content-Type: application/json}

```

{

  "name": "John Doe",#### Login

  "email": "john@example.com",```http

  "password": "SecurePass123!"POST /auth/login

}Content-Type: application/json

```

{

**Response:**  "email": "john@example.com",

```json  "password": "SecurePass123!"

{}

  "success": true,```

  "data": {

    "token": "eyJhbGciOiJIUzI1NiIs...",#### Get Current User

    "user": {```http

      "id": "65f8a9b2c3d4e5f6g7h8i9j0",GET /auth/me

      "name": "John Doe",Authorization: Bearer <token>

      "email": "john@example.com",```

      "role": "user"

    }### Task Endpoints (Protected)

  }

}#### Get All Tasks

``````http

GET /tasks

#### LoginAuthorization: Bearer <token>

```http```

POST /auth/login

Content-Type: application/json#### Create Task

```http

{POST /tasks

  "email": "john@example.com",Authorization: Bearer <token>

  "password": "SecurePass123!"Content-Type: application/json

}

```{

  "title": "Complete assignment",

#### Get Current User  "description": "Build REST API with authentication",

```http  "priority": "high",

GET /auth/me  "status": "pending"

Authorization: Bearer <token>}

``````



### Task Endpoints (CRUD - Protected)#### Get Task by ID

```http

#### Get All TasksGET /tasks/:id

```httpAuthorization: Bearer <token>

GET /tasks```

Authorization: Bearer <token>

Query Parameters: ?status=pending&priority=high&limit=10&offset=0#### Update Task

``````http

PUT /tasks/:id

#### Create TaskAuthorization: Bearer <token>

```httpContent-Type: application/json

POST /tasks

Authorization: Bearer <token>{

Content-Type: application/json  "title": "Updated title",

  "status": "completed"

{}

  "title": "Complete assignment",```

  "description": "Build REST API with authentication",

  "priority": "high",#### Delete Task

  "status": "pending"```http

}DELETE /tasks/:id

```Authorization: Bearer <token>

```

#### Get Task by ID

```http### Admin Endpoints (Admin Only)

GET /tasks/:id

Authorization: Bearer <token>#### Get All Users

``````http

GET /admin/users

#### Update TaskAuthorization: Bearer <admin_token>

```http```

PUT /tasks/:id

Authorization: Bearer <token>#### Update User Role

Content-Type: application/json```http

PUT /admin/users/:id/role

{Authorization: Bearer <admin_token>

  "status": "completed",Content-Type: application/json

  "priority": "medium"

}{

```  "role": "admin"

}

#### Delete Task```

```http

DELETE /tasks/:id#### Delete User

Authorization: Bearer <token>```http

```DELETE /admin/users/:id

Authorization: Bearer <admin_token>

### Admin Endpoints (Admin Role Only)```



#### Get All Users## 🔒 Security Features

```http

GET /admin/users- ✅ **Password Hashing** - Bcrypt with salt rounds

Authorization: Bearer <admin_token>- ✅ **JWT Authentication** - Secure token-based auth

```- ✅ **Role-Based Access Control** - User/Admin roles

- ✅ **Input Validation** - Joi schema validation

#### Update User Role- ✅ **SQL Injection Prevention** - Parameterized queries

```http- ✅ **XSS Protection** - Input sanitization

PUT /admin/users/:id/role- ✅ **Rate Limiting** - Prevent brute force attacks

Authorization: Bearer <admin_token>- ✅ **CORS Configuration** - Controlled cross-origin requests

Content-Type: application/json- ✅ **Helmet.js** - Security headers

- ✅ **HTTP Security Headers** - CSP, HSTS, etc.

{

  "role": "admin"## 🎯 Core Features

}

```### Authentication

- User registration with email validation

#### Delete User- Secure login with JWT tokens

```http- Token refresh mechanism

DELETE /admin/users/:id- Password reset functionality

Authorization: Bearer <admin_token>- Role-based authorization (User/Admin)

```

### Task Management (CRUD)

#### Get Statistics- Create tasks with title, description, priority, status

```http- Read all tasks (with pagination)

GET /admin/statistics- Read single task by ID

Authorization: Bearer <admin_token>- Update task details

```- Delete tasks

- Filter and sort tasks

---- Task ownership (users can only access their tasks)



## 🔒 Security Features### Admin Features

- View all users

✅ **JWT Authentication** - Stateless token-based auth (7-day expiry)  - Promote/demote user roles

✅ **Password Hashing** - Bcrypt with 10 salt rounds  - Delete users

✅ **Role-Based Access Control** - User & Admin roles  - View system statistics

✅ **Input Validation** - express-validator with custom rules  

✅ **SQL Injection Prevention** - Mongoose ODM parameterized queries  ### Caching (Redis)

✅ **XSS Protection** - Input sanitization  - Cache frequently accessed data

✅ **Rate Limiting** - 100 requests per 15 minutes  - Reduce database load

✅ **CORS Configuration** - Controlled cross-origin requests  - Improve response times

✅ **Security Headers** - Helmet.js (CSP, HSTS, etc.)  - Cache invalidation on updates

✅ **Error Handling** - Centralized error management  

### Logging

---- Winston logger for all operations

- Request/response logging

## 🎯 Core Features- Error logging with stack traces

- Separate log files by level

### ✅ Authentication & Authorization

- User registration with email validation## 📈 Scalability Considerations

- Secure login with JWT tokens

- Password hashing (Bcrypt)### Current Implementation

- Token-based authentication

- Role-based access control (User/Admin)1. **Modular Architecture**

- Protected routes   - Separated concerns (controllers, services, models)

   - Easy to add new modules/features

### ✅ Task Management (CRUD)   - Testable code structure

- Create tasks with title, description, priority, status

- Read all user's tasks (with filtering & pagination)2. **Caching Layer**

- Read single task by ID   - Redis for frequently accessed data

- Update task details   - Reduces database load

- Delete tasks   - Improves response times

- Task ownership validation

3. **Database Indexing**

### ✅ Admin Features   - Indexed email, user_id columns

- View all users   - Optimized query performance

- Update user roles (promote/demote)

- Delete users4. **API Versioning**

- View system statistics   - `/api/v1/` structure

- Protected admin-only routes   - Easy to maintain multiple versions



### ✅ API Best Practices### Future Scalability Enhancements

- RESTful API design

- API versioning (/api/v1/)1. **Microservices Architecture**

- Proper HTTP status codes   - Split into auth, tasks, notifications services

- Consistent error responses   - Independent scaling of services

- Request/response logging   - Better fault isolation

- API documentation (Swagger)

- Postman collection included2. **Message Queue (RabbitMQ/Kafka)**

   - Async task processing

---   - Event-driven architecture

   - Better handling of high loads

## 📈 Scalability & Architecture

3. **Load Balancing**

See `SCALABILITY.md` for detailed scalability considerations including:   - Nginx/HAProxy for distributing traffic

- Microservices architecture   - Multiple backend instances

- Horizontal scaling strategies   - Session management with Redis

- Database optimization (indexing, replication)

- Caching strategies (Redis)4. **Database Optimization**

- Load balancing   - Read replicas for scaling reads

- Message queues   - Database sharding for horizontal scaling

- CDN integration   - Connection pooling optimization

- Monitoring & observability

5. **CDN Integration**

### Current Implementation   - Static asset delivery

   - Reduced server load

**✅ Modular Architecture**   - Global content distribution

- Clear separation of concerns (MVC pattern)

- Service layer for business logic6. **Monitoring & Observability**

- Easy to add new features/modules   - Prometheus + Grafana for metrics

   - ELK stack for log aggregation

**✅ Database Optimization**   - APM tools (New Relic, DataDog)

- MongoDB Atlas (cloud-managed, auto-scaling)

- Indexed fields (email, userId, status, priority)7. **Container Orchestration**

- Mongoose schemas with validation   - Kubernetes for container management

   - Auto-scaling based on load

**✅ Caching Layer**   - Self-healing capabilities

- Redis for frequently accessed data

- TTL-based cache (5-10 minutes)8. **API Gateway**

- Cache invalidation on updates   - Centralized authentication

   - Rate limiting per user/IP

**✅ API Versioning**   - Request routing and transformation

- `/api/v1/` structure

- Easy to maintain multiple versions## 🧪 Testing



**✅ Error Handling**```bash

- Centralized error middleware# Run all tests

- Custom AppError classnpm test

- Consistent error responses

# Run tests with coverage

---npm run test:coverage



## 🧪 Testing# Run specific test suite

npm test -- auth.test.js

### Using Postman```

Import `Postman_Collection.json` into Postman and test all endpoints.

## 📝 API Response Format

### Using Swagger UI

Navigate to `http://localhost:5000/api-docs` and test endpoints interactively.### Success Response

```json

### Manual Testing{

  "success": true,

1. **Register a new user**  "data": {

2. **Login** to get JWT token    // Response data

3. **Create tasks** using the token  },

4. **Update/Delete tasks**  "message": "Operation successful"

5. **Test admin routes** (login as admin first)}

```

**Default Admin Credentials:**

```### Error Response

Email: admin@example.com```json

Password: Admin123!{

```  "success": false,

  "error": {

---    "message": "Error description",

    "code": "ERROR_CODE"

## 📝 Database Schema  }

}

### Users Collection```

```javascript

{## 🚀 Deployment

  _id: ObjectId,

  name: String (required),### Production Checklist

  email: String (required, unique, indexed),- [ ] Update environment variables

  password: String (required, hashed),- [ ] Enable HTTPS

  role: String (enum: ['user', 'admin'], default: 'user'),- [ ] Set up database backups

  createdAt: Date (auto),- [ ] Configure monitoring

  updatedAt: Date (auto)- [ ] Set up CI/CD pipeline

}- [ ] Enable production logging

```- [ ] Configure rate limiting

- [ ] Set up CDN for static assets

### Tasks Collection

```javascript### Deploy to Heroku

{

  _id: ObjectId,```bash

  userId: ObjectId (ref: 'User', indexed),# Login to Heroku

  title: String (required),heroku login

  description: String,

  status: String (enum: ['pending', 'in_progress', 'completed'], default: 'pending', indexed),# Create new app

  priority: String (enum: ['low', 'medium', 'high'], default: 'medium', indexed),heroku create your-app-name

  createdAt: Date (auto),

  updatedAt: Date (auto)# Add PostgreSQL addon

}heroku addons:create heroku-postgresql:mini

```

# Add Redis addon

---heroku addons:create heroku-redis:mini



## 🚦 API Response Format# Set environment variables

heroku config:set JWT_SECRET=your-secret

### Success Response

```json# Deploy

{git push heroku main

  "success": true,```

  "data": { ... },

  "message": "Operation successful"## 👥 Default Users

}

```After running migrations, the following admin user is created:



### Error Response- **Email**: admin@example.com

```json- **Password**: Admin123!

{- **Role**: admin

  "success": false,

  "error": {## 📄 License

    "message": "Error description",

    "code": "ERROR_CODE",MIT License

    "stack": "..." // Only in development

  }## 👨‍💻 Author

}

```Your Name - Backend Developer Intern Assignment



---## 🤝 Contributing



## 🎨 Frontend FeaturesContributions are welcome! Please feel free to submit a Pull Request.



- User Registration & Login## 📞 Support

- JWT Token Management (stored in localStorage)

- Protected RoutesFor any queries, please reach out to: your.email@example.com

- Task Dashboard
- Create/Edit/Delete Tasks
- Error/Success Toast Messages
- Responsive Design
- Logout Functionality

---

## 📦 NPM Scripts

### Backend
```bash
npm run dev         # Start development server (nodemon)
npm start           # Start production server
npm run migrate     # Create admin user
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
```

### Frontend
```bash
npm run dev         # Start development server
npm start           # Start development server (alias)
npm run build       # Build for production
npm test            # Run tests
```

---

## 🐳 Docker Deployment

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all containers
docker-compose down

# Rebuild containers
docker-compose up -d --build
```

---

## 📊 Project Highlights

✅ **Complete REST API** with authentication & RBAC  
✅ **Production-ready** security practices  
✅ **Scalable architecture** with modular design  
✅ **MongoDB Atlas** cloud database integration  
✅ **Redis caching** for performance optimization  
✅ **API documentation** (Swagger + Postman)  
✅ **Docker support** for easy deployment  
✅ **Functional frontend** for API demonstration  
✅ **Error handling** & validation at every level  
✅ **Logging** with Winston  
✅ **Clean code** following best practices  

---

## 🔗 Links

- **Backend API**: http://localhost:5000
- **Frontend UI**: http://localhost:3000
- **API Documentation**: http://localhost:5000/api-docs
- **GitHub Repository**: [Your GitHub URL]

---

## 👨‍💻 Author

**Your Name**  
Backend Developer Intern Assignment  
[Your Email] | [Your GitHub] | [Your LinkedIn]

---

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Note**: This project demonstrates backend development skills including API design, database management, authentication, security, and scalability considerations. The frontend is intentionally simple to focus on backend implementation.
