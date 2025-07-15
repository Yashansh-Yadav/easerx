const express = require("express");
const router = express.Router();

const {
  Appointment,
  Prescription,
  DoctorProfile,
  ChemistProfile,
  ReceptionistProfile,
  User
} = require("../models");
const authenticate = require("../middlewares/authenticate");


router.get("/dashboardData/:userId", authenticate, async (req, res) => {
  const {role , id:userId} = req.user;
  switch (role) {
    case "patient":
      try {
        const appointments = await Appointment.findAll({
          where: { patient_id: userId },
          include: ["Doctor"]
        });

        const prescriptions = await Prescription.findAll({
          where: { patient_id: userId },
          include: ["Doctor"]
        });

        res.json({ appointments, prescriptions });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case "doctor":
      try {
        const appointments = await Appointment.findAll({
          where: {
            doctor_id: userId,
            scheduled_date: new Date().toISOString().split("T")[0],
          },
          include: ["Patient"]
        });

        const profile = await DoctorProfile.findOne({ where: { userId } });

        res.json({ appointments, profile });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case "chemist":
      try {
        const prescriptions = await Prescription.findAll({
          where: { chemist_id: userId },
          include: ["Patient", "Doctor"]
        });

        const profile = await ChemistProfile.findOne({ where: { userId } });

        res.json({ prescriptions, profile });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    case "receptionist":
      try {
        const profile = await ReceptionistProfile.findOne({ where: { userId } });

        if (!profile) return res.status(404).json({ message: "Profile not found" });

        const doctorAppointments = await Appointment.findAll({
          where: {
            doctor_id: profile.assignedDoctorId,
            scheduled_date: new Date().toISOString().split("T")[0],
          },
          include: ["Patient"]
        });

        const doctor = await DoctorProfile.findOne({
          where: { id: profile.assignedDoctorId }
        });

        res.json({ doctor, doctorAppointments });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    default:
      break;
  }
});


module.exports = router;
