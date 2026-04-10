import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  youtubeId: String,
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);