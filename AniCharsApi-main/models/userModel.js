const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A user must have a username."],
      validate: [
        /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username is invalid, please try another",
      ],
      unique: [true, "Username already used!"],
    },
    photo: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "A user must have a password."],
      validate: {
        validator: validator.isStrongPassword,
        message:
          "Strong password required (1 symbol, 1 Upper, 1 Lower, 1 Number, min 8)",
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "A user must confirm their password."],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "The confirm password must match the password.",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    favoriteSeries: [{ type: mongoose.Schema.ObjectId, ref: "Series" }],
    favoriteCharacters: [{ type: mongoose.Schema.ObjectId, ref: "Character" }],
    location: { type: mongoose.Schema.ObjectId, ref: "Location" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("ratings", {
  ref: "Rating",
  foreignField: "user",
  localField: "_id",
});

// making sure that users that are deactivated are not shown when searched
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });

  next();
});

userSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "favoriteSeries",
    select: "title image type mal_id aired",
  })
    .populate({ path: "favoriteCharacters", select: "name image mal_id" })
    .populate("ratings");

  next();
});

// checking to see if a user modified iss password and if he did encrypt it before saving it to the DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

// if a user updates his password we invalidate his jwt token by marking all previous jwt token as expired
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
});

// method for comparing decrypted password to encrypted password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// method for validating if a jwt token was created before or after a password change
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
