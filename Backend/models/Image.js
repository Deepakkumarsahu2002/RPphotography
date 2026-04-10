import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  category: String,
}, { timestamps: true });

export default mongoose.model("Image", imageSchema);