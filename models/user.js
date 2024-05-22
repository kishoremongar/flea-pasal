const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  addresses: [
    {
      street: {
        type: String,
        required: true,
      },
      apartmentNo: {
        type: String,
      },
      pincode: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      isPrimary: {
        type: Boolean,
        default: false,
      },
    },
  ],
  socialLinks: {
    facebook: {
      type: String,
      maxlength: 100,
    },
    twitter: {
      type: String,
      maxlength: 100,
    },
    instagram: {
      type: String,
      maxlength: 100,
    },
  },
});

UserSchema.path("addresses").validate(function (addresses) {
  const primaryAddresses = addresses.filter((address) => address.isPrimary);
  return primaryAddresses.length <= 1;
}, "Only one address can be marked as primary");

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
