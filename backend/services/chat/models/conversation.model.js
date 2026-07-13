import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  title:{
    type:String,
    defaule:"New Chat"
  },
  userId : {
    type:String
  }
},
{
    timestamps: true
})
const Conveasataion = mongoose.model("Conveasataion", conversationSchema);
export default Conveasataion;