import {getChatByThreadIdService,sendChatService } from "../services/chat.service.js";


export const getChatsByThread=async(req,res)=>{
    try{
        const {threadId}=req.params;
        const chats=await getChatByThreadIdService(threadId);
        res.status(200).json({
            success:true,
            chats
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


export const sendChat = async (req, res) => {
    try {
      const { receiverId, message } = req.body;
  
      if (!receiverId || !message) {
        return res.status(400).json({
          success: false,
          message: "receiverId and message are required"
        });
      }
  
      const chat = await sendChatService(
        req.user.id,
        receiverId,
        message
      );
  
      res.status(201).json({
        success: true,
        message: "Chat sent successfully",
        chat
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
