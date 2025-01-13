const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectToDB = require('./config/connectToDB');
const principalRoutes = require('./routes/principleRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const { PORT } = require('../backend/config/dotenv.config')
const fs = require('fs');
const cloudinaryConfig = require('./config/cloudinaryConfig');

dotenv.config();

const app = express();

const port = PORT || 3000;

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Created directory: ${uploadDir}`);
}

cloudinaryConfig();
// Route handlers
const routes = [
  { path: '/api/v1/principal', route: principalRoutes },
  { path: '/api/v1/school', route: schoolRoutes },
  { path: '/api/v1/teacher', route: teacherRoutes },
  { path: '/api/v1/classes', route: classRoutes },
];
routes.forEach(({ path, route }) => app.use(path, route));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start the server and connect to the database
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectToDB()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
