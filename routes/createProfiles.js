const express = require("express");
const router = express.Router();
const { User, DoctorProfile, ReceptionistProfile, ChemistProfile } = require("../models");
const authenticate = require("../middlewares/authenticate");

// 1. Create User Profile
router.post("/users",authenticate, async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Create Doctor Profile
router.post("/doctors",authenticate, async (req, res) => {
  try {
    const doctor = await DoctorProfile.create(req.body);
    res.status(201).json({ message: "Doctor profile created", data: doctor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Create Receptionist Profile
router.post("/receptionists",authenticate, async (req, res) => {
  try {
    const receptionist = await ReceptionistProfile.create(req.body);
    res.status(201).json({ message: "Receptionist profile created", data: receptionist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Create Chemist Profile
router.post("/chemists",authenticate, async (req, res) => {
  try {
    const chemist = await ChemistProfile.create(req.body);
    res.status(201).json({ message: "Chemist profile created", data: chemist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
