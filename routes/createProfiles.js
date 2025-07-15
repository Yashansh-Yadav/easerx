const express = require("express");
const router = express.Router();
const { User, DoctorProfile, ReceptionistProfile, ChemistProfile } = require("../models");
const authenticate = require("../middlewares/authenticate");

router.post("/createProfile", authenticate, async (req, res) => {
  const userData = req.user;
  switch (userData?.role) {
    case "patient":
      try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created", data: user });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "doctor":
      try {
        const doctor = await DoctorProfile.create(req.body);
        res.status(201).json({ message: "Doctor profile created", data: doctor });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "receptionist":
      try {
        const receptionist = await ReceptionistProfile.create(req.body);
        res.status(201).json({ message: "Receptionist profile created", data: receptionist });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "chemist":
      try {
        const chemist = await ChemistProfile.create(req.body);
        res.status(201).json({ message: "Chemist profile created", data: chemist });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      break;
  }
});


module.exports = router;
