import api from "../../utils/axios";

export const verifyPayment = async (payload) => {
  try {
   const {data} =await api.post("/api/billing/verify",payload);
   console.log(data)
 return data;

    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return null;
  }
}; 