import { Mic ,SendIcon} from 'lucide-react'
import React, { useState } from 'react'
import sendMessage from '../features/sendMessage.js'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setMessages } from '../redux/messageSlice.js'
import {
  Send,
  Paperclip,
  Square,
  Zap,
  MessageSquare,
  Code2,
  Presentation,
  Image as ImageIcon,
  Globe,
  FileText,
  X,
} from "lucide-react";
const ChatInput = () => {
  const [value , setValue] = useState("")
  const [selectedAgent, setSelectedAgent]= useState("Auto")
    const { selectedConversation } = useSelector(state => state.conversation);
    const dispatch = useDispatch();
      const { messages } = useSelector(state => state.message);
  const handleSentMessage= async()=>{
    const payload ={
       prompt:value.trim(),conversationId:selectedConversation?._id, agent :selectedAgent.toLowerCase()
    }
    dispatch(addMessage({role:"user", content :value.trim()}))
    setValue("")
    const data =  await sendMessage(payload);
        dispatch(addMessage({role:"assistent", content :data?.answer, images: data.images}))
        
    console.log(data)
  }

  const agent = [
    {
      id: "auto",
      icon: Zap,
      label: "Auto",
    },

    {
      id: "chat",
      icon: MessageSquare,
      label: "Chat",
    },

    {
      id: "coding",
      icon: Code2,
      label: "Coding",
    },

    {
      id: "pdf",
      icon: FileText,
      label: "PDF",
    },

    {
      id: "ppt",
      icon: Presentation,
      label: "PPT",
    },

    {
      id: "image",
      icon: ImageIcon,
      label: "Image",
    },

    {
      id: "search",
      icon: Globe,
      label: "Search",
    },
  ];
  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3">
       <div className="flex w-[80%] gap-2 pr-2 flex-wrap">
          {agent.map((agent) => {
            const Icon = agent.icon;
            const isActive = selectedAgent === agent.id;

            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`
            flex-shrink-0
            
            inline-flex
            items-center
            gap-1.5
            px-3
            py-2
            rounded-full
            text-xs
            font-medium
            border
            transition-all

            ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]"
                : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"
            }
          `}
              >
                <Icon
                  size={14}
                  className={isActive ? "text-white" : "text-slate-500"}
                />

                {agent.label}
              </button>
            );
          })}
        </div>
           <textarea
           onChange={(e)=>setValue(e.target.value) }
           value = {value}
          placeholder='ask anything'
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
          rows={3}
        />
         <div className="flex items-center justify-between">  
          <div className="flex items-center gap-1">
        <button  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400
         hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 
         bg-transparent cursor-pointer">
          <Paperclip size={16}/>
          </button>  
         <button className="flex items-center justify-center w-8 h-8 rounded-lg
          text-slate-600 hover:text-slate-400  border border-transparent
           hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer">
            <Mic size={16}/>
            </button>  
         </div>
         <button
         disabled={!value}
         onClick={handleSentMessage}
         className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150
              ${ value.trim()
                    ? "bg-gradient-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white"
                    : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
              }`}>
          <SendIcon size={15}/>
         </button>
</div>
</div>
</div>
  )
}

export default ChatInput