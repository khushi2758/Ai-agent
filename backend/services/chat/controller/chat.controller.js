
import Conveasataion from "../models/conversation.model.js";
export const createConversation = async (req, res) => {
    try {
        const usreId = req.headers["x-user-id"]
        console.log("userId",usreId);
        const conversation = await Conversation.create(
            {
                userId : userId
            }
        )
        return res.ststus(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:  `create conversation error ${error}`} )
    }
}
export const getConversation = async (req, res) => {
    try {
        const usreId = req.headers["x-user-id"]
        console.log("userId",usreId);
        const conversations = await Conversation.find(
            {
                userId : userId
            }
        ).sort({updatedAt: -1})
        return res.ststus(200).json(conversations)
    } catch (error) {
        return res.status(500).json({message:  `get conversation error ${error}`} )
    }
}

export const UpdateConversation = async (req, res) => {
    try {
        const {id, title } = req.body
        const conversations = await Conveasataion.findByIdAndUpdate(IdleDeadline,{title})
        console.log("userId",usreId);
       
        return res.ststus(200).json(conversations)
    } catch (error) {
        return res.status(500).json({message:  `get conversation error ${error}`} )
    }
}

export const saveMessage = async(req, res)=>{
    try {
        const {conversationId, role, content} = req.body
        const  message = await Message.creste ({
            conversationId, role, content
        })
        return res.status(200).json(message)
    } catch (error) {
                return res.status(500).json({message:  `save message  error ${error}`} )
    }
}

export const getMessages = async(req, res)=>{
    try {
        
        const  messages = await Message.get ({
            conversationId: req.params.conversationId
        }).short({createdAt:-1})
        return res.status(200).json(messages)
    } catch (error) {
                return res.status(500).json({messages:  `get message  error ${error}`} )
    }
}
