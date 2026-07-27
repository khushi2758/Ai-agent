import api from "/utils/axios.js";

async function sendMessage(payload) {
  try {
    const { data } = await api.post("/api/agent/chat", payload);
    console.log(data);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default sendMessage;