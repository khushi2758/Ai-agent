import express from "express"
import { createConnection } from "mongoose";
import { createConversation, getConversation, getMessages, saveMessage } from "../controller/chat.controller.js";
const router = express.Router();
router.get("/create-conversation", createConversation);
router.get("/get-conversations", getConversation)
router.post("/save-message", saveMessage)
router.post("save-message", saveMessage)
router.get("get-message/:conversationId", getMessages)
export default router;