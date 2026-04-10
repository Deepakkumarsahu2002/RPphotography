import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

// 🔥 Upload Image
router.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const image = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      category: req.body.category.toLowerCase().trim(), // ✅ FIXED
    });

    await image.save();

    res.json(image);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// 🔥 Get Images
router.get("/", async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
});

// 🔥 DELETE IMAGE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    await cloudinary.uploader.destroy(image.public_id).catch(() => {});
    await image.deleteOne();

    res.json({ msg: "Image deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

export default router;