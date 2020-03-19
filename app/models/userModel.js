const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required."],
      trim: true,
      minlength: 5,
      unique: true,
      validate: {
        validator: v => validator.isEmail(v),
        message: "{VALUE} is not a valid email."
      }
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

//instance method for validate password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
