import Chat from "../models/chat.js";
import Thread from "../models/thread.js";

/**
 * Get all chats by thread ID
 */
export const getChatByThreadIdService = async (threadId) => {
  return await Chat.find({ thread: threadId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 });
};


/**
 * Send a message between two users
 */
export const sendChatService = async (senderId, receiverId, message) => {
  // Ensure thread exists
  const thread = await findOrCreateThreadService(senderId, receiverId);

  // Create chat message
  const chat = await Chat.create({
    thread: thread._id,
    sender: senderId,
    message,
  });

  // Populate sender info before returning
  return await chat.populate("sender", "name email");
};


/**
 * Find existing thread between two users or create one
 */
export const findOrCreateThreadService = async (userId1, userId2) => {
  // Sort IDs to ensure consistent order
  const participants = [userId1.toString(), userId2.toString()].sort();

  let thread = await Thread.findOne({
    participants: participants,
  });

  if (!thread) {
    thread = await Thread.create({ participants });
  }

  return thread;
};
