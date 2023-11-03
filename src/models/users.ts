import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      ref: "Roles",
      require: true,
    },
    whoCreated: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", usersSchema);
