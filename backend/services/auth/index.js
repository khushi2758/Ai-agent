import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./router/auth.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8001;
app.use(express.json());
app.use("/", router)

app.get("/", (req, res) => {
  res.send("Auth service is running");
});
app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
  connectDB();
});
