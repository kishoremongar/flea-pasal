const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const BlacklistedToken = require("../models/BlacklistedToken");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("inside bearer");
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = isTokenValid(token);
    const blacklistedToken = await BlacklistedToken.findOne({ token });
    if (blacklistedToken) {
      throw new CustomError.UnauthenticatedError("Token is no longer valid.");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      console.log("inside exp");
      throw new CustomError.UnauthenticatedError("Token has expired");
    }

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new CustomError.UnauthenticatedError("Authentication invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = isTokenValid(token);

      const blacklistedToken = await BlacklistedToken.findOne({ token });
      if (blacklistedToken) {
        throw new CustomError.UnauthenticatedError(
          "Token has been blacklisted"
        );
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        throw new CustomError.UnauthenticatedError("Token has expired");
      }

      if (!roles.includes(payload.user.role)) {
        throw new CustomError.UnauthorizedError(
          "Unauthorized to access this route"
        );
      }

      req.user = { userId: payload.user.userId };

      next();
    } catch (error) {
      throw new CustomError.UnauthenticatedError("Authentication invalid");
    }
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
