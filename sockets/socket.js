import { sendChatService } from "../services/chat.service.js";
export const registerSocketHandlers=(io)=>{
    const onlineUsers=new Map();
    io.on("connection",(socket)=>{
        console.log("New client connected:",socket.id);

        socket.on("user-online",(userId)=>{
            onlineUsers.set(userId,socket.id);
            console.log("User online:",onlineUsers);
        });

        socket.on("send-message",async(data)=>{
            try{
                const{senderId,receiverId,message}=data;
                if(!senderId||!receiverId||!message){
                    return socket.emit("error","senderId, receiverId and message are required");
                }
                const chat=await sendChatService(senderId,receiverId,message);
                const receiverSocketId=onlineUsers.get(receiverId);

                if(receiverSocketId){
                    io.to(receiverSocketId).emit("new-message",chat)
                    };

                socket.emit("message-sent",chat);    
                }
            }
        })
}