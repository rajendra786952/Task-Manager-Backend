const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: "Email address is already Registered",
    validate: {
      validator: function (value) {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
      },
      message: "Invalid email.",
    },
  },
  image: { type: String, required: true },
  password: { type: String, required: true },
},{
  timestamps: true 
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
