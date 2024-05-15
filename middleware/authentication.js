const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const Token = require("../models/Token");
const { attachCookiesToResponse } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  const authHeader = req.headers.authorization;
  console.log("headers", req.user, isTokenValid(authHeader.split(" ")[1]));
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    } else if (refreshToken) {
      const payload = isTokenValid(refreshToken);

      const existingToken = await Token.findOne({
        user: payload.user.userId,
        refreshToken: payload.refreshToken,
      });

      if (!existingToken || !existingToken?.isValid) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
      }

      attachCookiesToResponse({
        res,
        user: payload.user,
        refreshToken: existingToken.refreshToken,
      });

      req.user = payload.user;
      return next();
    } else if (authHeader?.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const payload = isTokenValid(token);
      req.user = payload.user;
      return next();
    } else {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
