const fs = require("fs");
const path = require("path");
const sequelize = require("../connections/db/sequelize");

const db = {};

// Import models
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

const {
  User,
  DoctorProfile,
  Appointment,
  QueueLog,
  Prescription,
  Payment,
  District,
  ReceptionistProfile,
  ChemistProfile
} = db;

// Associations

// User -> DoctorProfile
User.hasOne(DoctorProfile, { foreignKey: "userId" });
DoctorProfile.belongsTo(User, { foreignKey: "userId" });

// User -> chemistProfile
ChemistProfile.belongsTo(User, { foreignKey: 'userId' });
ChemistProfile.belongsTo(DoctorProfile, { foreignKey: 'doctorId' });

// User -> receptionistProfile
ReceptionistProfile.belongsTo(User, { foreignKey: 'userId' });
ReceptionistProfile.belongsTo(DoctorProfile, { foreignKey: 'assignedDoctorId', as: 'AssignedDoctor' });

// User -> District
User.belongsTo(District, { foreignKey: "districtId" });
District.hasMany(User, { foreignKey: "districtId" });

// Appointments
User.hasMany(Appointment, { foreignKey: "patientId", as: "PatientAppointments" });
User.hasMany(Appointment, { foreignKey: "doctorId", as: "DoctorAppointments" });
Appointment.belongsTo(User, { foreignKey: "patientId", as: "Patient" });
Appointment.belongsTo(User, { foreignKey: "doctorId", as: "Doctor" });

// QueueLog
Appointment.hasOne(QueueLog, { foreignKey: "appointmentId" });
QueueLog.belongsTo(Appointment, { foreignKey: "appointmentId" });

// Prescriptions
User.hasMany(Prescription, { foreignKey: "patientId", as: "PatientPrescriptions" });
User.hasMany(Prescription, { foreignKey: "doctorId", as: "DoctorPrescriptions" });
User.hasMany(Prescription, { foreignKey: "chemistId", as: "ChemistPrescriptions" });

Prescription.belongsTo(User, { foreignKey: "patientId", as: "Patient" });
Prescription.belongsTo(User, { foreignKey: "doctorId", as: "Doctor" });
Prescription.belongsTo(User, { foreignKey: "chemistId", as: "Chemist" });

// Payment
Appointment.hasOne(Payment, { foreignKey: "appointmentId" });
Payment.belongsTo(Appointment, { foreignKey: "appointmentId" });

User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

db.sequelize = sequelize;
module.exports = db;
