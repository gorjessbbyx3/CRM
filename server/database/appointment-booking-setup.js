const { pool } = require('./setup');
const logger = require('../utils/logger');

async function setupAppointmentBookingDatabase() {
  try {
    await pool.query(`
      -- Appointment Booking System Database Schema
      
      -- Departments for staff organization
      CREATE TABLE IF NOT EXISTS departments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        manager_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Staff roles and permissions
      CREATE TABLE IF NOT EXISTS staff_roles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        department_id UUID REFERENCES departments(id),
        permissions JSONB,
        base_pay_rate DECIMAL(8,2),
        commission_percentage DECIMAL(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Enhanced staff profiles (extends users)
      CREATE TABLE IF NOT EXISTS staff_profiles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) UNIQUE,
        employee_id VARCHAR(50) UNIQUE,
        department_id UUID REFERENCES departments(id),
        role_id UUID REFERENCES staff_roles(id),
        hire_date DATE,
        hourly_rate DECIMAL(8,2) DEFAULT 0,
        commission_rate DECIMAL(5,2) DEFAULT 0,
        specialization TEXT[],
        certifications TEXT[],
        bio TEXT,
        profile_image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Services catalog
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        duration_minutes INTEGER NOT NULL,
        base_price DECIMAL(10,2) NOT NULL,
        category VARCHAR(100),
        subcategory VARCHAR(100),
        requirements TEXT[],
        equipment_needed TEXT[],
        is_active BOOLEAN DEFAULT true,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Service packages/bundles
      CREATE TABLE IF NOT EXISTS service_packages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        discount_percentage DECIMAL(5,2) DEFAULT 0,
        total_duration_minutes INTEGER,
        total_base_price DECIMAL(10,2),
        is_active BOOLEAN DEFAULT true,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Package services mapping
      CREATE TABLE IF NOT EXISTS package_services (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        package_id UUID REFERENCES service_packages(id),
        service_id UUID REFERENCES services(id),
        quantity INTEGER DEFAULT 1,
        custom_duration_minutes INTEGER,
        custom_price DECIMAL(10,2),
        sequence_order INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Rooms/Spaces management
      CREATE TABLE IF NOT EXISTS rooms (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100),
        capacity INTEGER DEFAULT 1,
        description TEXT,
        amenities TEXT[],
        equipment TEXT[],
        hourly_rate DECIMAL(8,2),
        is_active BOOLEAN DEFAULT true,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Enhanced appointments (extends scheduled_events)
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        scheduled_event_id UUID REFERENCES scheduled_events(id),
        service_id UUID REFERENCES services(id),
        package_id UUID REFERENCES service_packages(id),
        room_id UUID REFERENCES rooms(id),
        appointment_type VARCHAR(50) DEFAULT 'individual',
        booking_status VARCHAR(20) DEFAULT 'pending',
        payment_status VARCHAR(20) DEFAULT 'pending',
        total_amount DECIMAL(10,2),
        tax_amount DECIMAL(10,2) DEFAULT 0,
        discount_amount DECIMAL(10,2) DEFAULT 0,
        deposit_amount DECIMAL(10,2) DEFAULT 0,
        notes TEXT,
        special_requests TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Appointment staff assignment
      CREATE TABLE IF NOT EXISTS appointment_staff (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        appointment_id UUID REFERENCES appointments(id),
        staff_id UUID REFERENCES staff_profiles(id),
        role VARCHAR(50),
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Staff availability schedules
      CREATE TABLE IF NOT EXISTS staff_schedules (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        staff_id UUID REFERENCES staff_profiles(id),
        day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
        start_time TIME,
        end_time TIME,
        break_times JSONB,
        is_working BOOLEAN DEFAULT true,
        effective_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Room bookings
      CREATE TABLE IF NOT EXISTS room_bookings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        room_id UUID REFERENCES rooms(id),
        appointment_id UUID REFERENCES appointments(id),
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        booking_date DATE,
        status VARCHAR(20) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Staff service rates
      CREATE TABLE IF NOT EXISTS staff_service_rates (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        staff_id UUID REFERENCES staff_profiles(id),
        service_id UUID REFERENCES services(id),
        rate_type VARCHAR(20) DEFAULT 'fixed',
        rate_amount DECIMAL(10,2),
        commission_percentage DECIMAL(5,2),
        effective_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Payments tracking
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        appointment_id UUID REFERENCES appointments(id),
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50),
        transaction_id VARCHAR(255),
        status VARCHAR(20) DEFAULT 'pending',
        paid_at TIMESTAMP,
        refund_amount DECIMAL(10,2) DEFAULT 0,
        refund_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Commission tracking
      CREATE TABLE IF NOT EXISTS staff_commissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        staff_id UUID REFERENCES staff_profiles(id),
        appointment_id UUID REFERENCES appointments(id),
        service_id UUID REFERENCES services(id),
        commission_amount DECIMAL(10,2),
        calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        paid_at TIMESTAMP,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Customer preferences
      CREATE TABLE IF NOT EXISTS customer_preferences (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        contact_id UUID REFERENCES contacts(id),
        preferred_staff UUID REFERENCES staff_profiles(id),
        preferred_room UUID REFERENCES rooms(id),
        service_preferences JSONB,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for performance
      CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
      CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
      CREATE INDEX IF NOT EXISTS idx_appointments_service ON appointments(service_id);
      CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(booking_status);
      CREATE INDEX IF NOT EXISTS idx_staff_department ON staff_profiles(department_id);
      CREATE INDEX IF NOT EXISTS idx_staff_active ON staff_profiles(is_active);
      CREATE INDEX IF NOT EXISTS idx_room_bookings_room ON room_bookings(room_id);
      CREATE INDEX IF NOT EXISTS idx_room_bookings_time ON room_bookings(start_time, end_time);
      CREATE INDEX IF NOT EXISTS idx_staff_schedules_staff ON staff_schedules(staff_id);
      CREATE INDEX IF NOT EXISTS idx_staff_commissions_staff ON staff_commissions(staff_id);
      CREATE INDEX IF NOT EXISTS idx_payments_appointment ON payments(appointment_id);
    `);

    logger.info('Appointment booking database setup completed successfully');
  } catch (error) {
    logger.error('Appointment booking database setup failed:', error);
    throw error;
  }
}

module.exports = { setupAppointmentBookingDatabase };
