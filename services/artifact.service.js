import Artifact from "../models/artifact.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Create a new artifact
 */
export const createArtifactService = async ({
  title,
  content,
  userId,
  filePath,   // pass this from controller
}) => {

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  let mediaUrl = null;

  // Upload file if exists
  if (filePath) {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "artifacts",
    });

    mediaUrl = uploadResult.secure_url;

    // Delete local file after upload
    fs.unlinkSync(filePath);

    console.log("Media uploaded to Cloudinary:", mediaUrl);
  }

  const artifact = await Artifact.create({
    title,
    content,
    author: userId,
    file:mediaUrl,   // Save Cloudinary URL in DB
  });

  return artifact;
};








export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
    // Admin sees everything
    return await Artifact.find().populate("author", "name email role");
  }

  // Non-admin sees only their own artifacts
  return await Artifact.find({ author: userId });
};