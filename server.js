const express = require("express");
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const dbPort = process.env.SERVER_PORT;

const whitelist = ["*"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

// Use the routes
const userRoutes = require("./routes/useRoutes");
const useAuth = require("./routes/auth");

app.use("/api", userRoutes);
app.use("/api", useAuth);


const PORT = dbPort || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connected");
    await db.sequelize.sync({ alter: true });
    console.log("✅ Models synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the DB:", error);
  }
})();
