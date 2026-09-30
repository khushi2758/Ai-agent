import { useEffect, useState } from "react";
import AIBanner from "./AiBanner";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import MessageList from "./MessageList";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import getMessages from "../features/getMessages";
import { useDispatch } from "react-redux";
import { setAetifacte, setMessages } from "../redux/messageSlice";
function ChatArea() {
  const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.message);

  const { selectedConversation } = useSelector(state => state.conversation);
  console.log("Selected Conversation:", selectedConversation);

 useEffect(() => {
  const getMesg = async () => {
    if (selectedConversation) {

      const data = await getMessages(selectedConversation?._id);
      dispatch(setMessages(data));
     
      console.log(data.artifacts || []);
          const latestartifectMessage =[...data].reverse().find(msg => msg.artifacts && msg.artifacts.length > 0)
          dispatch(setAetifacte(latestartifectMessage.artifacts || []))
    }
    
  };
   getMesg();

}, [selectedConversation?._id]);
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Navbar />
      <MessageList />
      <ChatInput />
    </div>
  );
}

export default ChatArea;
