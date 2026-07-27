import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import router from "./router/agent.route.js";




console.log(process.env.GROQ_API_KEY);
console.log("GOOGLE:", process.env.GOOGLE_API_KEY);

const app = express();
const port = process.env.PORT || 8003;
app.use(express.json());

app.use("/", router)
app.get("/", (req, res) => {
  res.json({message:"chat service is running"});
});
app.listen(port, () => {
  console.log(`agent  is running on port ${port}`);
  connectDB();
});
