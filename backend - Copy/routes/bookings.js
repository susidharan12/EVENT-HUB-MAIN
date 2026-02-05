const express = require('express');
const pool = require('../db');
const {authenticateToken}= require('../middleware/authmiddleware');

const router = express.Router();

// CREATE BOOKING
router.post('/', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { event_id, seats_booked } = req.body;

    if (!event_id || !seats_booked) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get event details
    const eventResult = await client.query(
      'SELECT id, price, available_seats FROM events WHERE id = $1 FOR UPDATE',
      [event_id]
    );

    if (eventResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = eventResult.rows[0];

    if (event.available_seats < seats_booked) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: `Not enough seats available. Available: ${event.available_seats}` 
      });
    }

    const totalPrice = event.price * seats_booked;

    // Create booking (Matches schema: user_id, event_id, seats_booked, total_price, booking_status)
    const bookingResult = await client.query(
      `INSERT INTO bookings (user_id, event_id, seats_booked, total_price, booking_status) 
       VALUES ($1, $2, $3, $4, 'confirmed') 
       RETURNING *`,
      [req.user.id, event_id, seats_booked, totalPrice]
    );

    // Update available seats
    await client.query(
      'UPDATE events SET available_seats = available_seats - $1 WHERE id = $2',
      [seats_booked, event_id]
    );

    await client.query('COMMIT');
    res.status(201).json({
      message: 'Booking created successfully',
      booking: bookingResult.rows[0],
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  } finally {
    client.release();
  }
});

// GET USER BOOKINGS
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, e.title, e.event_date, e.location 
       FROM bookings b 
       LEFT JOIN events e ON b.event_id = e.id 
       WHERE b.user_id = $1 
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json({ bookings: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// CANCEL BOOKING
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { id } = req.params;

    const bookingResult = await client.query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (bookingResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookingResult.rows[0];
    if (booking.booking_status === 'cancelled') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Already cancelled' });
    }

    await client.query(
      "UPDATE bookings SET booking_status = 'cancelled' WHERE id = $1",
      [id]
    );

    await client.query(
      'UPDATE events SET available_seats = available_seats + $1 WHERE id = $2',
      [booking.seats_booked, booking.event_id]
    );

    await client.query('COMMIT');
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Cancellation failed' });
  } finally {
    client.release();
  }
});

module.exports = router;