const USER_ROLES = [
    { id: 1, name: "patient" },
    { id: 2, name: "doctor" },
    { id: 3, name: "chemist" },
    { id: 4, name: "receptionist" }
  ];
  
  const ROLES_TO_VERIFY =  ["doctor", "chemist"]

  module.exports = { USER_ROLES,ROLES_TO_VERIFY };