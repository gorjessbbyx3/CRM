# Ultimate CRM - AI-Powered Customer Relationship Management System

A comprehensive, modern CRM system built with Next.js and Node.js, featuring AI-powered insights, automated workflows, and seamless communication tools.

## 🚀 Features

### Core CRM Capabilities
- **Contact Management**: Smart contact segmentation and relationship tracking
- **Deal Pipeline**: Visual pipeline management with automated workflows
- **Company Management**: B2B account management with hierarchy support
- **Activity Tracking**: Complete interaction history across all channels
- **Staff Management**: Team member profiles and role-based access
- **Service Management**: Product/service catalog with pricing
- **Room/Resource Booking**: Facility and resource management

### AI-Powered Features
- **Predictive Analytics**: Deal scoring and win probability predictions
- **Smart Recommendations**: Next best actions and follow-up suggestions
- **Automated Workflows**: AI-driven task automation and reminders
- **Intelligent Insights**: Customer behavior analysis and trends
- **Appointment Scheduling**: Smart booking with conflict resolution

### Communication Hub
- **Email Integration**: Gmail, Outlook, and custom SMTP support
- **SMS & Calls**: Twilio integration for SMS and voice calls
- **Social Media**: LinkedIn, Twitter, and Facebook integration
- **Video Conferencing**: Zoom, Teams, and Google Meet integration

### Advanced Analytics
- **Custom Dashboards**: Real-time KPI tracking and visualization
- **Sales Forecasting**: AI-powered revenue predictions
- **Performance Reports**: Team and individual performance metrics
- **Customer Insights**: Lifetime value and churn predictions

### Enterprise Features
- **Multi-tenant Architecture**: Support for multiple organizations
- **Role-based Access Control**: Granular permissions and security
- **Audit Logging**: Complete activity tracking and compliance
- **Advanced Reporting**: Custom reports and data export
- **Integration APIs**: RESTful APIs for third-party integrations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library
- **Heroicons** - Beautiful SVG icons
- **Recharts** - Charting library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Socket.io** - Real-time communication

### AI/ML
- **OpenAI GPT** - Natural language processing
- **Custom ML Models** - Predictive analytics

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **AWS S3** - File storage (configurable)
- **CloudFront** - CDN for static assets

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ultimate-crm.git
cd ultimate-crm
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start PostgreSQL and Redis**
```bash
# Using Docker
docker-compose up -d postgres redis

# Or manually start PostgreSQL and Redis
```

5. **Set up the database**
```bash
npm run db:setup
```

6. **Start development servers**
```bash
npm run dev
```

### Using Docker (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Or for development
docker-compose -f docker-compose.dev.yml up
```

### Environment Variables
Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ultimate_crm

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secret
JWT_SECRET=your-super-secret-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Twilio (for SMS/Calls)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure

```
ultimate-crm/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── dashboard/         # Dashboard pages
├── components/            # Reusable React components
├── server/               # Express backend
│   ├── index.js          # Server entry point
│   ├── database/         # Database setup and migrations
│   ├── routes/          # API route handlers
│   ├── middleware/       # Express middleware
│   └── utils/           # Utility functions
├── public/              # Static assets
├── styles/              # Additional styles
├── docker-compose.yml   # Docker configuration
├── Dockerfile          # Docker image
└── package.json        # Dependencies and scripts
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/:id` - Get specific contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Deals
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `GET /api/deals/:id` - Get specific deal
- `PUT /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Delete deal

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company
- `GET /api/companies/:id` - Get specific company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### AI Features
- `POST /api/ai/predict` - Get AI predictions
- `POST /api/ai/recommend` - Get AI recommendations
- `POST /api/ai/summarize` - Get AI summaries

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test suite
npm test -- --testNamePattern="Contact"
```

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Start backend server only
npm run server:dev

# Start frontend server only
npm run client:dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the best CRM practices
- Powered by AII have gathered the following information:

Information Gathered:
- The project is named "Ultimate CRM" and is an advanced AI-powered CRM system.
- The README.md already contains a comprehensive description, features, tech stack, installation instructions, project structure, API documentation, testing, license, and acknowledgments.
- The package.json confirms the use of Next.js 14, React, Express, PostgreSQL, Redis, Socket.io, and other dependencies.
- The frontend app/page.js shows a modern React component with features and call-to-action sections.
- The backend server/index.js is an Express server with many API routes, middleware, and Socket.io integration.

Plan:
- Since a README.md already exists and is quite detailed, I will review it for any missing or outdated information based on the current project files.
- I will update or enhance the README.md to ensure it accurately reflects the current project structure, dependencies, and usage.
- I will ensure the README.md is well formatted and easy to read.

Dependent Files to be edited:
- README.md

Followup steps:
- After updating README.md, suggest running the project using the provided scripts to verify everything works as expected.

Please confirm if you want me to proceed with updating and improving the README.md based on the current project state. 

<ask_followup_question>
<question>Do you want me to update and improve the existing README.md file to reflect the current project structure and usage?</question>
</ask_followup_question>
