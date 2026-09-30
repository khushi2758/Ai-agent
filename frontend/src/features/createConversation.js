import api from "../../utils/axios";

export const createConversation = async () => {
  try {
   const response =await api.post("/api/chat/create-conversation",{});

 return response.data;

    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
}; 