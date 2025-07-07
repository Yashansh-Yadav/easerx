const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/doctors/:districtId', async (req, res) => {
  try {
    const doctors = await db.User.findAll({
      where: { role: 'doctor', district_id: req.params.districtId },
      include: db.DoctorProfile
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const { patient_id, doctor_id, scheduled_date } = req.body;

    const appointment = await db.Appointment.create({
      patient_id,
      doctor_id,
      scheduled_date,
      status: 'pending',
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
