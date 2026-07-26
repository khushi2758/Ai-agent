import React from 'react'
import api from "../../utils/axios";
function sendMessage(payload) {
      try {
        const {data} = await api.getUri("/api/agent/chat",payload);
           console.log(data)
    } catch (error) {
            console.log(error)
            return null
    }
}

export default sendMessage