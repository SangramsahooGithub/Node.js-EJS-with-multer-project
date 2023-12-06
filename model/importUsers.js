import mongoose from "mongoose";

const importUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("importusers", importUserSchema);
