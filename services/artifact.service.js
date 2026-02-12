import Artifact from "../models/artifact.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";


export const createArtifactService = async ({
  title,
  content,
  userId,
  filePath,   
}) => {

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  let mediaUrl = null;

  


  if (filePath) {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "artifacts",
    });

    mediaUrl = uploadResult.secure_url;

    
    fs.unlinkSync(filePath);

    console.log("Media uploaded to Cloudinary:", mediaUrl);
  }

  const artifact = await Artifact.create({
    title,
    content,
    author: userId,
    file:mediaUrl,   
  });

  return artifact;
};






export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
    
    return await Artifact.find().populate("author", "name email role");
  }

  
  return await Artifact.find({ author: userId });
};
