const User = require("../models/user");
const BlacklistedToken = require("../models/BlacklistedToken");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");
const { createTokens } = require("../utils/jwt");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "https://flea-pasal.vercel.app";
  // const forwardedHost = req.get("x-forwarded-host");
  // const forwardedProtocol = req.get("x-forwarded-proto");

  // const clientOrigin = `${forwardedProtocol}://${forwardedHost}`;

  try {
    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });
  } catch (error) {
    await user.deleteOne();
    throw new CustomError.BadRequestError("Error sending email");
  }

  res.status(StatusCodes.CREATED).json({
    msg: "Please check your email for verification link",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Token is invalid");
  }
  await user.updateOne({
    isVerified: true,
    verified: Date.now(),
    verificationToken: "",
  });

  res.status(StatusCodes.OK).json({ msg: "Email is verified." });
};

const login = async (req, res) => {
  const { email, password, re_login } = req.body;
  if (re_login) {
    await logout(req, res);
  }

  if (!email || !password) {
    let errorMessage = "Please provide ";
    if (!email && !password) {
      errorMessage += "an email and a password";
    } else if (!email) {
      errorMessage += "an email";
    } else {
      errorMessage += "a password";
    }
    throw new CustomError.BadRequestError(errorMessage);
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Wrong email provided.");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Wrong password provided.");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify your email");
  }
  const tokenUser = createTokenUser(user);

  if (!tokenUser) {
    throw new CustomError.BadRequestError(
      "Token user data is missing or invalid"
    );
  }

  // Create access token and refresh token
  const { accessToken, refreshToken } = createTokens({ payload: tokenUser });

  const responseData = {
    name: user.name,
    role: user.role,
    email: user.email,
    token: accessToken,
    refreshToken,
  };

  res.status(200).json(responseData);
};

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const expiresAt = Math.floor(Date.now() / 1000);
    await BlacklistedToken.create({ token, expiresAt });

    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.BadRequestError("Email does not exist");
  }

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email
    const origin = "https://flea-pasal.vercel.app";

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await user.updateOne({
      passwordToken: createHash(passwordToken),
      passwordTokenExpirationDate: passwordTokenExpirationDate,
    });
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.send("Password reset successfully.");
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

// Logging out based on cookies
// const logout = async (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) {
//     throw new CustomError.BadRequestError('Refresh token is required');
//   }
//   const foundToken = await Token.findOne({ refreshToken });
//   if (!foundToken) {
//     throw new CustomError.UnauthenticatedError('Invalid refresh token');
//   }
//   await Token.findOneAndDelete({ refreshToken });
//   res.cookie('accessToken', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   });
//   res.cookie('refreshToken', 'logout', {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   });
//   res.status(StatusCodes.OK).json({ msg: 'Successfully logged out', name });
// };

// Login with assignedCookies
// const login = async (req, res) => {
//   const { email, password, re_login } = req.body;
//   if (re_login) {
//     await logout(req, res);
//   }

//   if (!email || !password) {
//     let errorMessage = "Please provide ";
//     if (!email && !password) {
//       errorMessage += "an email and a password";
//     } else if (!email) {
//       errorMessage += "an email";
//     } else {
//       errorMessage += "a password";
//     }
//     throw new CustomError.BadRequestError(errorMessage);
//   }
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new CustomError.UnauthenticatedError("Wrong email provided.");
//   }

//   const isPasswordCorrect = await user.comparePassword(password);

//   if (!isPasswordCorrect) {
//     throw new CustomError.UnauthenticatedError("Wrong password provided.");
//   }

//   if (!user.isVerified) {
//     throw new CustomError.UnauthenticatedError("Please verify your email");
//   }

//   const tokenUser = createTokenUser(user);

//   if (!tokenUser) {
//     throw new CustomError.BadRequestError(
//       "Token user data is missing or invalid"
//     );
//   }
//   // create refresh token
//   let refreshToken = "";
//   // check for existing token
//   const existingToken = await Token.findOne({ user: user._id });

//   if (existingToken) {
//     const { isValid } = existingToken;

//     if (!isValid) {
//       throw new CustomError.UnauthenticatedError("Invalid Credentials");
//     }
//     refreshToken = existingToken.refreshToken;
//     attachCookiesToResponse({ res, user: tokenUser, refreshToken });
//     res.status(StatusCodes.OK).json({ ...tokenUser, token: refreshToken });
//     return;
//   }
//   refreshToken = crypto.randomBytes(40).toString("hex");
//   const userAgent = req.headers["user-agent"];
//   const ip = req.ip;
//   const userToken = { refreshToken, ip, userAgent, user: user._id };

//   await Token.create(userToken);

//   // const flattenedUser = {
//   //   user: {
//   //     name: user.name,
//   //     userId: user._id,
//   //     role: user.role,
//   //   },
//   //   refreshToken: refreshToken,
//   // };
//   attachCookiesToResponse({ res, user: tokenUser, refreshToken });
//   res.status(StatusCodes.OK).json({ ...tokenUser, token: refreshToken });
// };
