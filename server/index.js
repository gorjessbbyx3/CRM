const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { setupDatabase } = require('./database/setup');
const { setupEnterpriseDatabase } = require('./database/enterprise-setup');
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
    methods: ["GET", "POST", "PUT", "DELETE"]
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.IO setup
setupSocketHandlers(io);

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await setupDatabase();
    await setupEnterpriseDatabase();
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = { app, io };
