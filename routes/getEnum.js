const express = require("express");
const router = express.Router();
const { USER_ROLES } = require("../utils/enums");

router.get("/roles", (req, res) => {
  res.status(200).json({ roles: USER_ROLES });
});

module.exports = router;