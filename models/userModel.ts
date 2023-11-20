import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profilePic: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
