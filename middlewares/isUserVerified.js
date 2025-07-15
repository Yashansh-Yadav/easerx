const {Verification} = require("../models");
const { ROLES_TO_VERIFY } = require("../utils/enums");

const isUserVerified =async (req, res, next , decoded) => {
    if (ROLES_TO_VERIFY.includes(decoded.role)) {
        const verification = await Verification.findOne({ where: { userId: decoded.id } });
  
        if (!verification || !verification.isVerified) {
          return res.status(403).json({
            message: `Access denied. ${decoded.role} account not verified.`
          });
        }else{
            next();
        }
      }

};

module.exports = isUserVerified;
