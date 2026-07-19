import React, { useEffect, useState } from "react";

import {
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  User,
  PenSquare,
  Menu,
  X,
  Coins,
  ConeIcon,
  CoinsIcon,
  PanelLeftIcon,
  PenBoxIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../features/createConversation";
import { addConversation, setConversations } from "../redux/conversationSlice";
import { getConversations } from "../features/getConversations";

const Sidebar = () => {
  const [collaped, setCollaped] = useState(false);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchConversations = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };
    fetchConversations();
  }, []);
  const handleCreateConversation = async () => {
    const data = await createConversation();
    dispatch(addConversation(data));
  };
  return (
    <>
      {/* ── Sidebar panel ── */}
      <div
        className="
        fixed lg:static inset-y-0 left-0 z-50
        w-[270px] h-screen shrink-0
        bg-[#0d0f14] border-r border-white/[0.06]
        transition-transform duration-250
        -translate-x-full lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
            {/* Desktop collapse */}
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
              onAuxClick={() => setCollaped(true)}
            >
              <PanelLeftIcon />
            </button>
            <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
              AI
            </span>
            <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
              Free
            </span>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
              onClick={handleCreateConversation}
            >
              <PenSquare size={14} />
            </button>

            <button className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer">
              <Plus size={17} />
            </button>
          </div>
          {/*new chat*/}
          <div className="px-4 pt-4 pb-1">
            <button
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
              onClick={handleCreateConversation}
            >
              <Plus size={15} />
              New Chat
            </button>
          </div>
          {conversations.length == 0 ? (
            <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              No recent conversations
            </div>
          ) : (
            <p className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
              Recents
            </p>
          )}

          <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {conversations.map((conv,i)=>{
              
            })}
        </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
