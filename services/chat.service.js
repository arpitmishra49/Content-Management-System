import Chat from "../models/chat.js";
import Thread from "../models/thread.js";


export const getChatByThreadIdService = async (threadId) => {
  return await Chat.find({ thread: threadId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 });
};



export const sendChatService = async (senderId, receiverId, message) => {
  
  const thread = await findOrCreateThreadService(senderId, receiverId);

  
  const chat = await Chat.create({
    thread: thread._id,
    sender: senderId,
    message,
  });

  
  return await chat.populate("sender", "name email");
};



export const findOrCreateThreadService = async (userId1, userId2) => {
  
  const participants = [userId1.toString(), userId2.toString()].sort();

  let thread = await Thread.findOne({
    participants: participants,
  });

  if (!thread) {
    thread = await Thread.create({ participants });
  }

  return thread;
};
