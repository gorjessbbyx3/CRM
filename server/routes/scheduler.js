const express = require('express');
const router = express.Router();
const { pool } = require('../database/setup');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all scheduled events
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate, type } = req.query;

    let query = `
      SELECT 
        se.*,
        c.first_name || ' ' || c.last_name as contact_name,
        c.email as contact_email,
        d.title as deal_title,
        u.first_name || ' ' || u.last_name as assigned_to_name
      FROM scheduled_events se
      LEFT JOIN contacts c ON se.contact_id = c.id
      LEFT JOIN deals d ON se.deal_id = d.id
      LEFT JOIN users u ON se.assigned_to = u.id
      WHERE se.created_by = $1
    `;
    
    const params = [userId];
    
    if (startDate && endDate) {
      query += ` AND se.scheduled_at BETWEEN $2 AND $3`;
      params.push(startDate, endDate);
    }
    
    if (type) {
      query += ` AND se.type = $${params.length + 1}`;
      params.push(type);
    }
    
    query += ` ORDER BY se.scheduled_at ASC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching scheduled events:', error);
    res.status(500).json({ error: 'Failed to fetch scheduled events' });
  }
});

// Create new scheduled event
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      title,
      description,
      type,
      scheduled_at,
      contact_id,
      deal_id,
      assigned_to,
      recurrence_pattern,
      recurrence_end_date,
      notification_settings
    } = req.body;

    const result = await pool.query(`
      INSERT INTO scheduled_events (
        title, description, type, scheduled_at, contact_id, deal_id,
        assigned_to, recurrence_pattern, recurrence_end_date,
        notification_settings, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      title, description, type, scheduled_at, contact_id, deal_id,
      assigned_to, recurrence_pattern, recurrence_end_date,
      JSON.stringify(notification_settings), userId
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Error creating scheduled event:', error);
    res.status(500).json({ error: 'Failed to create scheduled event' });
  }
});

// Update scheduled event
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const updates = req.body;

    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');

    const result = await pool.query(`
      UPDATE scheduled_events 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND created_by = $${Object.keys(updates).length + 2}
      RETURNING *
    `, [id, ...Object.values(updates), userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Scheduled event not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Error updating scheduled event:', error);
    res.status(500).json({ error: 'Failed to update scheduled event' });
  }
});

// Delete scheduled event
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM scheduled_events WHERE id = $1 AND created_by = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Scheduled event not found' });
    }

    res.json({ message: 'Scheduled event deleted successfully' });
  } catch (error) {
    logger.error('Error deleting scheduled event:', error);
    res.status(500).json({ error: 'Failed to delete scheduled event' });
  }
});

// Get upcoming events
router.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { days = 7 } = req.query;

    const result = await pool.query(`
      SELECT 
        se.*,
        c.first_name || ' ' || c.last_name as contact_name,
        d.title as deal_title
      FROM scheduled_events se
      LEFT JOIN contacts c ON se.contact_id = c.id
      LEFT JOIN deals d ON se.deal_id = d.id
      WHERE se.created_by = $1 
        AND se.scheduled_at BETWEEN NOW() AND NOW() + INTERVAL '${days} days'
        AND se.status = 'scheduled'
      ORDER BY se.scheduled_at ASC
    `, [userId]);

    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching upcoming events:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming events' });
  }
});

module.exports = router;
