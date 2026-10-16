import axios from "axios";

const deductCredits = async (userId, agent) => {
  try {
    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE}/deduct-credits`,
      { userId, agent }
    );

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default deductCredits;