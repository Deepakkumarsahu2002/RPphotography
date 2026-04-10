import express from "express";
import Video from "../models/Video.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 FUNCTION: Extract YouTube ID (FULL SAFE)
const extractYouTubeId = (url) => {
  if (!url) return "";

  // Case 1: Full URL with v=
  if (url.includes("v=")) {
    return url.split("v=")[1].split("&")[0];
  }

  // Case 2: youtu.be link
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1].split("?")[0];
  }

  // Case 3: Already an ID
  return url;
};

// 🔥 Add Video
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, url } = req.body;

    const youtubeId = extractYouTubeId(url);

    if (!youtubeId) {
      return res.status(400).json({ msg: "Invalid YouTube URL" });
    }

    const video = new Video({
      title,
      youtubeId,
    });

    await video.save();

    res.json(video);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// 🔥 Get Videos
router.get("/", async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  res.json(videos);
});

// 🔥 DELETE VIDEO
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    await video.deleteOne();

    res.json({ msg: "Video deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

export default router;