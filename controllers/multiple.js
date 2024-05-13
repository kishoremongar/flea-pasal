//authController.js

const Token = require('../models/Token');
const { attachCookiesToResponse, createJWT } = require('../utils/jwt');
const createTokenUser = require('../utils/createTokenUser');

const login = async (req, res) => {
  // Authenticate the user
  // ...

  // Generate a new refresh token
  const refreshToken = createJWT({ payload: createTokenUser(user) });

  // Create a new token document in the database
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const tokenDoc = await Token.create({
    refreshToken,
    ip,
    userAgent,
    user: user._id,
  });

  // Attach the access token and refresh token to the response cookies
  attachCookiesToResponse({
    res,
    user: createTokenUser(user),
    refreshToken: tokenDoc.refreshToken,
  });

  res.status(200).json({ user: createTokenUser(user) });
};
