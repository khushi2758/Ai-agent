import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useSelector } from "react-redux";
import api from "../../utils/axios";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth, googleProvider } from "../../utils/firebase";
import Sidebar from "../component/Sidebar";
import Artifect from "../component/Artifect";
import ChatArea from "../component/ChatArea";
const Home = () => {
  const {userData} = useSelector(state => state.user);
   const dispatch = useDispatch()
  console.log(userData)
    const handleLogin = async(token)=>{
 try {
    const { data } = await axios.post(
  "http://localhost:8000/api/auth/login",
  { token },
  {
    withCredentials: true,
  }

);
      dispatch(setUserData(data))

 } catch (error) {
  console.log(error);
 }
}

  const googlelogin = async () => {
  const data = await signInWithPopup(auth, googleProvider)

  const token= await data.user.getIdToken()
  console.log(token)
  await handleLogin(token)
  console.log(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-between bg-black/60 backdrop-blur-sm">
     <Sidebar/>
     <ChatArea/>
     <Artifect/>
       
          {! userData &&  (<div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to AI
              </h2>
              <p className="text-[13px] text-slate-500">
                Please login to continue using the app.
              </p>
            </div>

            <button
              onClick={googlelogin}
              className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-white bg-gradient-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 active:from-indigo-600 active:to-violet-800 border border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-150 cursor-pointer"
            >
             
              Continue with Google
            </button>
          </div>)}
        </div>
  )
}

export default Home