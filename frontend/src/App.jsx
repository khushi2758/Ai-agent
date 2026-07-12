import React, { useEffect } from "react";

import Home from "./pages/Home";
import axios from "axios";
import getCurrentUser from "./features/getCurrentUser";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/user.slice";
const App = () => {
  const dispatch = useDispatch()
          useEffect(()=>{
            const getUser = async () => {
             const data = await getCurrentUser();
              dispatch(setUserData(data))
            }
            getUser();
          },[])



  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <Home/>
    </div>
  );
};

export default App;