import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
conversationId:{
   type:mongoose.Schema.Types.ObjectId,
   Ref: "Conversations"
},
   role:{
    type: String,
     emum: ["user", "assistant"]
   
},
content:String
},
{
    timestamps: true
})
const Message = mongoose.model("Message", messagesSchema);
export default Message;