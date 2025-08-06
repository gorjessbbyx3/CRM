const { pool } = require('./setup');
const logger = require('../utils/logger');

async function setupEnterpriseDatabase() {
  try {
    await pool.query(`
      -- Enterprise Business Management Tables
      
      -- Projects table
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'planning',
        priority VARCHAR(20) DEFAULT 'medium',
        budget DECIMAL(15,2),
        spent DECIMAL(15,2) DEFAULT 0,
        start_date DATE,
        end_date DATE,
        client_id UUID REFERENCES companies(id),
        project_manager_id UUID REFERENCES users(id),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tasks table
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'todo',
        priority VARCHAR(20) DEFAULT 'medium',
        estimated_hours INTEGER,
        actual_hours INTEGER DEFAULT 0,
        due_date DATE,
        completed_at TIMESTAMP,
        project_id UUID REFERENCES projects(id),
        assigned_to UUID REFERENCES users(id),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Time tracking
      CREATE TABLE IF NOT EXISTS time_entries (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        description TEXT,
        hours DECIMAL(4,2) NOT NULL,
        date DATE NOT NULL,
        billable BOOLEAN DEFAULT true,
        hourly_rate DECIMAL(8,2),
        task_id UUID REFERENCES tasks(id),
        project_id UUID REFERENCES projects(id),
        user_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Invoices
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        invoice_number VARCHAR(50) UNIQUE NOT NULL,
        client_id UUID REFERENCES companies(id),
        project_id UUID REFERENCES projects(id),
        amount DECIMAL(15,2) NOT NULL,
        tax_amount DECIMAL(15,2) DEFAULT 0,
        total_amount DECIMAL(15,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'draft',
        due_date DATE,
        paid_date DATE,
        notes TEXT,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Expenses
      CREATE TABLE IF NOT EXISTS expenses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        description VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(50),
        date DATE NOT NULL,
        receipt_url TEXT,
        project_id UUID REFERENCES projects(id),
        client_id UUID REFERENCES companies(id),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Scheduled Events
      CREATE TABLE IF NOT EXISTS scheduled_events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        type VARCHAR(50) NOT NULL,
        scheduled_at TIMESTAMP NOT NULL,
        duration_minutes INTEGER,
        location TEXT,
        meeting_url TEXT,
        contact_id UUID REFERENCES contacts(id),
        deal_id UUID REFERENCES deals(id),
        project_id UUID REFERENCES projects(id),
        assigned_to UUID REFERENCES users(id),
        recurrence_pattern VARCHAR(20),
        recurrence_end_date DATE,
        notification_settings JSONB,
        status VARCHAR(20) DEFAULT 'scheduled',
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Business Intelligence
      CREATE TABLE IF NOT EXISTS business_metrics (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        metric_name VARCHAR(100) NOT NULL,
        metric_value DECIMAL(15,2),
        metric_date DATE NOT NULL,
        category VARCHAR(50),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for performance
      CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
      CREATE INDEX IF NOT EXISTS idx_projects_manager ON projects(project_manager_id);
      CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
      CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);
      CREATE INDEX IF NOT EXISTS idx_time_entries_user ON time_entries(user_id);
      CREATE INDEX IF NOT EXISTS idx_time_entries_project ON time_entries(project_id);
      CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
      CREATE INDEX IF NOT EXISTS idx_invoices_project ON invoices(project_id);
      CREATE INDEX IF NOT EXISTS idx_expenses_project ON expenses(project_id);
      CREATE INDEX IF NOT EXISTS idx_scheduled_events_contact ON scheduled_events(contact_id);
      CREATE INDEX IF NOT EXISTS idx_scheduled_events_assigned ON scheduled_events(assigned_to);
      CREATE INDEX IF NOT EXISTS idx_scheduled_events_date ON scheduled_events(scheduled_at);
    `);

    logger.info('Enterprise database setup completed successfully');
  } catch (error) {
    logger.error('Enterprise database setup failed:', error);
    throw error;
  }
}

module.exports = { setupEnterpriseDatabase };
