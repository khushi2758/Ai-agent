import api from "../../utils/axios";

const saveMessage = async (payload) => {
  try {
    const { data } = await api.post("/api/chat/save-message", payload);
    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
};

export default saveMessage;