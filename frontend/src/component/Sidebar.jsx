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
  LogOutIcon,
  PanelLeftCloseIcon,
  PanelRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../features/createConversation";
import {
  addConversation,
  setConversations,
  setSelectConversations,
} from "../redux/conversationSlice";
import { getConversations } from "../features/getConversations";
import logOut from "../features/logOut";
import { setUserData } from "../redux/user.slice";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  const { userData } = useSelector((state) => state.user);
  console.log("Redux user:", userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchConversations = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };
    fetchConversations();
  }, [userData?._id]);
  const handleCreateConversation = async () => {
      try {
    const data = await createConversation();

    dispatch(addConversation(data));
    dispatch(setSelectConversations(data));
  } catch (error) {
    console.error("Error creating conversation:", error);
  }
  };
    if(collapsed){
      return
   ( <div className="hidden lg:flex flex-col items-center w-[100px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0 ">
      <button
        onClick={() => setCollapsed(false)}
        className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
      >
        <PanelRight />
      </button>

      <button
        onClick={handleCreateConversation}
        className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
      >
        <Plus size={17} />
      </button>

      <div className="flex-1 flex flex-col items-center gap-1 overflow-y-auto w-full px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-1">
        {conversations.map((chat) => {
          const isActive = selectedConversation?._id === chat._id;
          return (
            <button
              key={chat._id}
              onClick={() => handleSelectConversation(chat)}
              title={chat.title}
              className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 border-none cursor-pointer
                ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-transparent text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"}`}
            >
              <MessageSquare size={15} />
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        {userData && (
          <div className="relative">
            {userData.avatar
              ? <img src={userData.avatar} alt={userData.name} className="w-8 h-8 rounded-[8px] object-cover border-2 border-indigo-500/25" />
              : <div className="w-8 h-8 rounded-[8px] bg-white/[0.06] flex items-center justify-center"><User size={14} className="text-slate-400" /></div>
            }
            <span className="absolute -bottom-px -right-px w-2 h-2 bg-green-500 rounded-full border-[1.5px] border-[#0d0f14] block" />
          </div>
        )}
      </div>
    </div>)
  }
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
              onAuxClick={() => setCollapsed(true)}
            >
              <PanelLeftIcon />
            </button>
            <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
              AestheAI
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
            {conversations.map((conv) => {
              const isActive = selectedConversation?._id == conv?._id;

              return (
                <div
                  onClick={() => dispatch(setSelectConversations(conv))}
                  key={conv._id}
                  className={` flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150
      ${
        isActive
          ? "bg-indigo-500/10 border-indigo-500/[0.18]"
          : "bg-transparent border-transparent"
      }`}
                >
                  {" "}
                  <div
                    className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg transition-colors duration-150
                ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/[0.05] text-slate-500"}`}
                  >
                    <MessageSquare size={13} />
                  </div>
                  <span
                    className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}
                  >
                    {conv?.title || "New Chat"}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Divider */}
          <div className="mx-2.5 h-px bg-white/[0.06]" />
          <div className="px-3.5 py-3.5">
            {userData ? (
              <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
                <div className="relative shrink-0">
                  {!userData?.user.avatar || imageError ? (
                    <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] flex items-center justify-center">
                      <User size={15} className="text-slate-400" />
                    </div>
                  ) : (
                    <img
                     src={userData.user.avatar}
                       alt={userData.user.name}
                      className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                      onError={() => setImageError(true)}
                    />
                  )}
                  <span className="absolute -bottom-px -right-px w-[9px] h-[9px] bg-green-500 rounded-full border-2 border-[#0d0f14] block" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                    {userData.user.name || "user"}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-px">
                    {userData.user.plan || "Free Plan"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150">
                    <CoinsIcon size={16} />
                  </button>
                  <button className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                   onClick={
                    ()=> {
                      logOut();
                      dispatch(setUserData(null))
                    }
                   }
                  >
                    <LogOutIcon size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-1">
                <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/[0.05] border border-white/[0.08] rounded-xl py-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150"
                  
                >
                  Login
                </button>
              </div>
           
            )}
          </div>
        </div>
      </div>
    </>
  );




};

export default Sidebar;
