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
router.post('/events', authenticateToken, upload.single('event-cover'), async (req, res) => {
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

// UPDATE EVENT
router.put('/events/:id', authenticateToken, upload.single('event-cover'), async (req, res) => {
  try {
    // Only organizers can update events
    if (req.user.role !== 'organizer') return res.status(403).json({ error: 'Only organizers can update events' });

    const eventId = req.params.id;
    // Ensure organizer owns the event
    const ownerCheck = await pool.query('SELECT organizer_id FROM events WHERE id = $1', [eventId]);
    if (ownerCheck.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    if (ownerCheck.rows[0].organizer_id !== req.user.id) return res.status(403).json({ error: 'Not allowed' });

    const { title, description, location, event_date, price, total_seats, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updateQuery = `UPDATE events SET title=$1, description=$2, location=$3, event_date=$4, price=$5, total_seats=$6, available_seats=$7, category=$8${imageUrl ? ', images = array_append(images, $9)' : ''} WHERE id=$10 RETURNING *`;
    const params = [title, description, location, event_date, price, total_seats, total_seats, category];
    if (imageUrl) params.push(imageUrl);
    params.push(eventId);

    const result = await pool.query(updateQuery, params);
    res.json({ message: 'Event updated', event: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Also support PUT on '/:id' for backwards-compatibility with front-end callers
router.put('/:id', authenticateToken, upload.single('event-cover'), async (req, res) => {
  try {
    if (req.user.role !== 'organizer') return res.status(403).json({ error: 'Only organizers can update events' });
    const eventId = req.params.id;
    const ownerCheck = await pool.query('SELECT organizer_id FROM events WHERE id = $1', [eventId]);
    if (ownerCheck.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    if (ownerCheck.rows[0].organizer_id !== req.user.id) return res.status(403).json({ error: 'Not allowed' });

    const { title, description, location, event_date, price, total_seats, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updateQuery = `UPDATE events SET title=$1, description=$2, location=$3, event_date=$4, price=$5, total_seats=$6, available_seats=$7, category=$8${imageUrl ? ', images = array_append(images, $9)' : ''} WHERE id=$10 RETURNING *`;
    const params = [title, description, location, event_date, price, total_seats, total_seats, category];
    if (imageUrl) params.push(imageUrl);
    params.push(eventId);

    const result = await pool.query(updateQuery, params);
    res.json({ message: 'Event updated', event: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE EVENT
router.delete('/events/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') return res.status(403).json({ error: 'Only organizers can delete events' });
    const eventId = req.params.id;
    const ownerCheck = await pool.query('SELECT organizer_id FROM events WHERE id = $1', [eventId]);
    if (ownerCheck.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    if (ownerCheck.rows[0].organizer_id !== req.user.id) return res.status(403).json({ error: 'Not allowed' });

    await pool.query('DELETE FROM events WHERE id = $1', [eventId]);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Also support DELETE on '/:id' for backwards-compatibility with front-end callers
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') return res.status(403).json({ error: 'Only organizers can delete events' });
    const eventId = req.params.id;
    const ownerCheck = await pool.query('SELECT organizer_id FROM events WHERE id = $1', [eventId]);
    if (ownerCheck.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    if (ownerCheck.rows[0].organizer_id !== req.user.id) return res.status(403).json({ error: 'Not allowed' });

    await pool.query('DELETE FROM events WHERE id = $1', [eventId]);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;