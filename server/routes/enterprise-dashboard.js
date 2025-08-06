const express = require('express');
const router = express.Router();
const { pool } = require('../database/setup');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Enterprise Dashboard Routes

// Get dashboard overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const overview = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
    logger.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
});

// Get real-time metrics
router.get('/real-time-metrics', authenticate_token, async (req, res) => {
  try {
    const { userId } = req.user;
    
    const metrics = await pool.query(`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as total_won_deals,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) as total_revenue,
        COUNT(CASE WHEN deals.stage = 'lost' THEN 1 END) as total_lost_deals,
        COUNT(CASE WHEN deals.stage NOT IN ('won', 'lost') THEN 1 END) as total_active_deals,
        AVG(deals.probability) as avg_win_probability,
        COUNT(CASE WHEN contacts.status = 'active' THEN 1 END) as active_contacts,
        COUNT(CASE WHEN companies.status = 'active' THEN 1 END) as active_companies,
        SUM(CASE WHEN deals.stage = 'won' THEN deals.value ELSE 0 END) / COUNT(CASE WHEN deals.stage = 'won' THEN 1 END) as avg_deal_value
      FROM deals
      LEFT JOIN contacts ON deals.contact_id = contacts.id
      LEFT JOIN companies ON deals.company_id = companies.id
      WHERE deals.created_by = $1
    `, [userId]);

    res.json(overview.rows[0]);
  } catch (error) {
