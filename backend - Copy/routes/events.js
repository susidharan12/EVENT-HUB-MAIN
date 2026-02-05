const express = require('express');
const pool = require('../db');
const {authenticateToken}= require('../middleware/authmiddleware');
const {createEvent, getEvents, getEventById} = require('../controllers/eventController'); 

const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer storage (matches 'uploads' folder in server.js)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE EVENT
router.post('/create', authenticateToken, upload.single('event-cover'), async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ error: 'Only organizers can create events' });
    }

    const { title, description, location, event_date, price, total_seats, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO events 
       (organizer_id, title, description, location, event_date, price, total_seats, available_seats, images, category) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [req.user.id, title, description, location, event_date, price, total_seats, total_seats, imageUrl ? [imageUrl] : [], category]
    );

    res.status(201).json({ message: 'Event created', event: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// GET ALL EVENTS
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE event_date >= NOW() ORDER BY event_date ASC');
    res.json({ events: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET SINGLE EVENT
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT e.*, u.name as organizer_name FROM events e JOIN users u ON e.organizer_id = u.id WHERE e.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ event: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
});

module.exports = router;