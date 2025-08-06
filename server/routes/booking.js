const express = require('express');
const router = express.Router();
const { pool } = require('../database/setup');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// ======================
// SERVICES MANAGEMENT
// ======================

// Get all services
router.get('/services', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, 
             c.name as category_name
      FROM services s
      LEFT JOIN service_categories c ON s.category = c.name
      WHERE s.is_active = true
      ORDER BY s.name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Create new service
router.post('/services', authenticateToken, async (req, res) => {
  try {
    const {
      name, description, duration_minutes, base_price, category, subcategory,
      requirements, equipment_needed, is_active = true
    } = req.body;

    const result = await pool.query(`
      INSERT INTO services (name, description, duration_minutes, base_price, category, subcategory, requirements, equipment_needed, is_active, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [name, description, duration_minutes, base_price, category, subcategory, requirements, equipment_needed, is_active, req.user.userId]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// ======================
// PACKAGES MANAGEMENT
// ======================

// Get all packages
router.get('/packages', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT sp.*, 
             json_agg(json_build_object('id', s.id, 'name', s.name, 'duration', s.duration_minutes, 'price', s.base_price)) as services
      FROM service_packages sp
      LEFT JOIN package_services ps ON sp.id = ps.package_id
      LEFT JOIN services s ON ps.service_id = s.id
      WHERE sp.is_active = true
      GROUP BY sp.id
      ORDER BY sp.name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// ======================
// ROOMS MANAGEMENT
// ======================

// Get all rooms
router.get('/rooms', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             COUNT(rb.id) as current_bookings
      FROM rooms r
      LEFT JOIN room_bookings rb ON r.id = rb.room_id 
        AND rb.start_time <= NOW() AND rb.end_time >= NOW()
      WHERE r.is_active = true
      GROUP BY r.id
      ORDER BY r.name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// ======================
// STAFF MANAGEMENT
// ======================

// Get all staff
router.get('/staff', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT sp.*, 
             d.name as department_name,
             sr.name as role_name
      FROM staff_profiles sp
      LEFT JOIN departments d ON sp.department_id = d.id
      LEFT JOIN staff_roles sr ON sp.role_id = sr.id
      WHERE sp.is_active = true
      ORDER BY sp.first_name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

// ======================
// AVAILABILITY CHECKING
// ======================

// Check availability for booking
router.get('/availability', authenticateToken, async (req, res) => {
  try {
    const { start_date, end_date, service_id, staff_id, room_id } = req.query;

    let query = `
      SELECT 
        ss.staff_id,
        ss.day_of_week,
        ss.start_time,
        ss.end_time,
        ss.is_working
      FROM staff_schedules ss
      WHERE ss.is_working = true
    `;

    const params = [];
    
    if (staff_id) {
      query += ` AND ss.staff_id = $${params.length + 1}`;
      params.push(staff_id);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

// ======================
// BOOKING MANAGEMENT
// ======================

// Create new appointment
router.post('/appointments', authenticateToken, async (req, res) => {
  try {
    const {
      title, description, type, scheduled_at, duration_minutes, location, meeting_url,
      contact_id, service_id, package_id, room_id, staff_id, recurrence_pattern,
      recurrence_end_date, notification_settings
    } = req.body;

    const result = await pool.query(`
      INSERT INTO appointments (
        title, description, type, scheduled_at, duration_minutes, location, meeting_url,
        contact_id, service_id, package_id, room_id, staff_id, recurrence_pattern,
        recurrence_end_date, notification_settings, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `, [title, description, type, scheduled_at, duration_minutes, location, meeting_url,
        contact_id, service_id, package_id, room_id, staff_id, recurrence_pattern,
        recurrence_end_date, JSON.stringify(notification_settings), req.user.userId]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Get all appointments
router.get('/appointments', authenticateToken, async (req, res) => {
  try {
    const { start_date, end_date, status } = req.query;

    let query = `
      SELECT a.*, 
             s.name as service_name,
             sp.name as package_name,
             r.name as room_name,
             sp.first_name || ' ' || sp.last_name as staff_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN service_packages sp ON a.package_id = sp.id
      LEFT JOIN rooms r ON a.room_id = r.id
      LEFT JOIN staff_profiles sp ON a.staff_id = sp.id
      WHERE a.created_by = $1
    `;

    const params = [req.user.userId];

    if (start_date && end_date) {
      query += ` AND a.scheduled_at BETWEEN $2 AND $3`;
      params.push(start_date, end_date);
    }

    if (status) {
      query += ` AND a.booking_status = $${params.length + 1}`;
      params.push(status);
    }

    query += ` ORDER BY a.scheduled_at ASC`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get upcoming appointments
router.get('/appointments/upcoming', authenticateToken, async (req, res) => {
  try {
    const { days = 7 } = req.query;

    const result = await pool.query(`
      SELECT a.*, 
             s.name as service_name,
             sp.name as package_name,
             r.name as room_name,
             sp.first_name || ' ' || sp.last_name as staff_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      LEFT JOIN service_packages sp ON a.package_id = sp.id
      LEFT JOIN rooms r ON a.room_id = r.id
      LEFT JOIN staff_profiles sp ON a.staff_id = sp.id
      WHERE a.scheduled_at BETWEEN NOW() AND NOW() + INTERVAL '${days} days'
        AND a.booking_status = 'confirmed'
      ORDER BY a.scheduled_at ASC
    `);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching upcoming appointments:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming appointments' });
  }
});

module.exports = router;
