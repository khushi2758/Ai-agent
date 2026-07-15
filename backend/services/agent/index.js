import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./router/agent.route.js";



dotenv.config();

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
