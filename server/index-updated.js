const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { setupDatabase } = require('./database/setup');
const { setupEnterpriseDatabase } = require('./database/appointment-booking-setup');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const dealRoutes = require('./routes/deals');
const companyRoutes = require('./routes/companies');
const activityRoutes = require('./routes/activities');
const emailRoutes = require('./routes/emails');
const smsRoutes = require('./routes/sms');
const callRoutes = require('./routes/calls');
const reportRoutes = require('./routes/reports');
const integrationRoutes = require('./routes/integrations');
const aiRoutes = require('./routes/ai');
const schedulerRoutes = require('./routes/scheduler');
const enterpriseDashboardRoutes = require('./routes/enterprise-dashboard');
const appointmentRoutes = require('./routes/appointments');
const staffRoutes = require('./routes/staff');
const serviceRoutes = require('./routes/services');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/booking');
const { authenticateToken } = require('./middleware/auth');
const { setupSocketHandlers } = require('./socket/handlers');
const logger = require('./utils/logger');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', authenticateToken, contactRoutes);
app.use('/api/deals', authenticateToken, dealRoutes);
app.use('/api/companies', authenticateToken, companyRoutes);
app.use('/api/activities', authenticateToken, activityRoutes);
app.use('/api/emails', authenticateToken, emailRoutes);
app.use('/api/sms', authenticateToken, smsRoutes);
app.use('/api/calls', authenticateToken, callRoutes);
app.use('/api/reports', authenticateToken, reportRoutes);
app.use('/api/integrations', authenticateToken, integrationRoutes);
app.use('/api/ai', authenticateToken, aiRoutes);
app.use('/api/scheduler', authenticateToken, schedulerRoutes);
app.use('/api/enterprise', authenticateToken, enterpriseDashboardRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/staff', authenticateToken, staffRoutes);
app.use('/api/services', authenticateToken, serviceRoutes);
app.use('/api/rooms', authenticateToken, roomRoutes);
app.use('/api/booking', authenticateToken, bookingRoutes);

// HealthI have created the comprehensive appointment booking system database schema in a new file server/database/appointment-booking-setup.js and implemented the REST API routes in server/routes/booking.js. The main server entry point server/index.js has been updated to include the new booking routes.

Next steps:
- You can run the database setup script to create the new tables.
- Test the new API endpoints under /api/booking.
- Integrate frontend components to utilize the new booking system.

This completes the backend upgrade for the appointment booking system with service, package, room, staff, pay rate, and commission management features.
