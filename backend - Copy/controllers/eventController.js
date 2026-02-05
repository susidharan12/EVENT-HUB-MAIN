// controllers/eventController.js
const pool = require('../db');

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  const { title, description, category, location, event_date, price, total_seats } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (organizer_id, title, description, category, location, event_date, price, total_seats, available_seats) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [req.user.id, title, description, category, location, event_date, price, total_seats, total_seats]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEvent = async (req, res) => { res.json({ message: "Update logic here" }); };
const deleteEvent = async (req, res) => { res.json({ message: "Delete logic here" }); };
const uploadImages = async (req, res) => { res.json({ message: "Upload logic here" }); };

module.exports = { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent, uploadImages };