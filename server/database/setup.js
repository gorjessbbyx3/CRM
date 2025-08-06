const { Pool } = require('pg');
const logger = require('../utils/logger');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://crm_user:crm_password@localhost:5432/ultimate_crm',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function setupDatabase() {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        avatar_url TEXT,
        phone VARCHAR(20),
        timezone VARCHAR(50) DEFAULT 'UTC',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Companies table
      CREATE TABLE IF NOT EXISTS companies (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        industry VARCHAR(100),
        size VARCHAR(20),
        website TEXT,
        phone VARCHAR(20),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        postal_code VARCHAR(20),
        annual_revenue DECIMAL(15,2),
        description TEXT,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Contacts table
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        mobile VARCHAR(20),
        job_title VARCHAR(100),
        department VARCHAR(100),
        company_id UUID REFERENCES companies(id),
        lead_source VARCHAR(50),
        status VARCHAR(20) DEFAULT 'active',
        tags TEXT[],
        notes TEXT,
        social_profiles JSONB,
        created_by UUID REFERENCES users(id),
        assigned_to UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Deals table
      CREATE TABLE IF NOT EXISTS deals (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        value DECIMAL(15,2),
        currency VARCHAR(3) DEFAULT 'USD',
        stage VARCHAR(50) DEFAULT 'prospecting',
        probability INTEGER DEFAULT 0,
        expected_close_date DATE,
        actual_close_date DATE,
        description TEXT,
        deal_source VARCHAR(50),
        priority VARCHAR(20) DEFAULT 'medium',
        tags TEXT[],
        contact_id UUID REFERENCES contacts(id),
        company_id UUID REFERENCES companies(id),
        created_by UUID REFERENCES users(id),
        assigned_to UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Activities table
      CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        type VARCHAR(50) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        priority VARCHAR(20) DEFAULT 'medium',
        due_date TIMESTAMP,
        completed_at TIMESTAMP,
        contact_id UUID REFERENCES contacts(id),
        deal_id UUID REFERENCES deals(id),
        company_id UUID REFERENCES companies(id),
        created_by UUID REFERENCES users(id),
        assigned_to UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Emails table
      CREATE TABLE IF NOT EXISTS emails (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        subject VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        from_email VARCHAR(255) NOT NULL,
        to_emails TEXT[] NOT NULL,
        cc_emails TEXT[],
        bcc_emails TEXT[],
        status VARCHAR(20) DEFAULT 'draft',
        sent_at TIMESTAMP,
        contact_id UUID REFERENCES contacts(id),
        deal_id UUID REFERENCES deals(id),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Calls table
      CREATE TABLE IF NOT EXISTS calls (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        phone_number VARCHAR(20) NOT NULL,
        direction VARCHAR(10) NOT NULL,
        duration INTEGER,
        recording_url TEXT,
        notes TEXT,
        outcome VARCHAR(50),
        contact_id UUID REFERENCES contacts(id),
        deal_id UUID REFERENCES deals(id),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- SMS table
      CREATE TABLE IF NOT EXISTS sms (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        phone_number VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        direction VARCHAR(10) NOT NULL,
        status VARCHAR(20) DEFAULT 'sent',
        contact_id UUID REFERENCES contacts(id),
        deal_id UUID REFERENCES deals(id),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Notes table
      CREATE TABLE IF NOT EXISTS notes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        content TEXT NOT NULL,
        entity_type VARCHAR(50) NOT NULL,
        entity_id UUID NOT NULL,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tags table
      CREATE TABLE IF NOT EXISTS tags (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(50) UNIQUE NOT NULL,
        color VARCHAR(7),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Custom fields table
      CREATE TABLE IF NOT EXISTS custom_fields (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        entity_type VARCHAR(50) NOT NULL,
        field_name VARCHAR(100) NOT NULL,
        field_type VARCHAR(20) NOT NULL,
        field_options JSONB,
        is_required BOOLEAN DEFAULT false,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Custom field values
      CREATE TABLE IF NOT EXISTS custom_field_values (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        field_id UUID REFERENCES custom_fields(id),
        entity_id UUID NOT NULL,
        value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Webhooks table
      CREATE TABLE IF NOT EXISTS webhooks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        url TEXT NOT NULL,
        events TEXT[] NOT NULL,
        secret VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
      CREATE INDEX IF NOT EXISTS idx_contacts_company ON contacts(company_id);
      CREATE INDEX IF NOT EXISTS idx_contacts_assigned ON contacts(assigned_to);
      CREATE INDEX IF NOT EXISTS idx_deals_company ON deals(company_id);
      CREATE INDEX IF NOT EXISTS idx_deals_contact ON deals(contact_id);
      CREATE INDEX IF NOT EXISTS idx_deals_assigned ON deals(assigned_to);
      CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
      CREATE INDEX IF NOT EXISTS idx_activities_contact ON activities(contact_id);
      CREATE INDEX IF NOT EXISTS idx_activities_deal ON activities(deal_id);
      CREATE INDEX IF NOT EXISTS idx_activities_assigned ON activities(assigned_to);
      CREATE INDEX IF NOT EXISTS idx_emails_contact ON emails(contact_id);
      CREATE INDEX IF NOT EXISTS idx_calls_contact ON calls(contact_id);
      CREATE INDEX IF NOT EXISTS idx_sms_contact ON sms(contact_id);
      CREATE INDEX IF NOT EXISTS idx_notes_entity ON notes(entity_type, entity_id);
    `);

    logger.info('Database setup completed successfully');
  } catch (error) {
    logger.error('Database setup failed:', error);
    throw error;
  }
}

module.exports = { pool, setupDatabase };
