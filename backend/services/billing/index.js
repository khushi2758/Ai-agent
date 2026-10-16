import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/billing.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8004;
app.use(express.json());

app.use("/", router);
app.get("/", (req, res) => {
  res.send("Billing service is running");
});
app.listen(port, () => {
  console.log(`Billing service is running on port ${port}`);
  connectDB();
});
