const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select([
    "-password",
    "-verificationToken",
    "-isVerified",
    "-verified",
  ]);
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const {
    email,
    name,
    birthday,
    gender,
    phone_number,
    apartmentNo,
    city,
    pincode,
    landmark,
    street,
    state,
    country,
  } = req.body;

  // Check if required fields are present
  const requiredFields = [
    "name",
    "email",
    "phone_number",
    "apartmentNo",
    "city",
    "pincode",
    "landmark",
    "street",
    "state",
    "country",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    throw new CustomError.BadRequestError(
      `Please provide ${missingFields.join(", ")}`
    );
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (req?.files?.profile_picture) {
    const result = await cloudinary.uploader.upload(
      req.files.profile_picture.tempFilePath,
      {
        use_filename: true,
        folder: "FleaPasal/profile",
      }
    );
    fs.unlinkSync(req.files.profile_picture.tempFilePath);
    user.profilePicture = result.secure_url;
  }
  user.email = email;
  user.name = name;
  user.birthday = birthday || user.birthday;
  user.gender = gender || user.gender;
  user.phoneNumber = phone_number;

  const addressObj = {
    apartmentNo,
    city,
    pincode,
    landmark,
    street,
    state,
    country,
    isPrimary: true,
  };

  const existingAddresses = user.addresses;
  let primaryAddress = null;

  existingAddresses.forEach((address) => {
    if (address.isPrimary) {
      primaryAddress = address;
      address.isPrimary = false;
    }
  });

  addressObj.isPrimary = true;

  if (primaryAddress) {
    user.addresses = existingAddresses.map((address) =>
      address._id.toString() === primaryAddress._id.toString()
        ? addressObj
        : address
    );
  } else {
    user.addresses = [...existingAddresses, addressObj];
  }

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "User updated successfully" });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
