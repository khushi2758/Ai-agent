# 🤖 AestheAI

![React](https://img.shields.io/badge/React-19-blue)

![Node](https://img.shields.io/badge/Node.js-Express-green)

![MongoDB](https://img.shields.io/badge/MongoDB-Database-success)

![Redis](https://img.shields.io/badge/Redis-Memory-red)

![LangGraph](https://img.shields.io/badge/LangGraph-AI-purple)

![License](https://img.shields.io/badge/License-MIT-yellow)

> **A production-ready Multi-Agent AI Platform built with React, Node.js, LangGraph, LangChain, Redis, and MongoDB.**

AestheAI is a full-stack AI platform that combines multiple specialized AI agents into a single intelligent application. Instead of relying on one general-purpose assistant, each agent is responsible for a specific task, enabling more accurate, context-aware, and scalable AI interactions.

---

# ✨ Features

## 🔐 Authentication

- Google Sign-In using Firebase Authentication
- Secure backend authentication
- Protected API routes
- User-specific conversations
- Persistent user sessions

---

## 💬 Chat Agent

- Context-aware AI conversations
- Multi-turn dialogue support
- Markdown formatted responses
- Conversation history persistence
- Optimized prompt management

---

## 🌐 Search Agent

- Real-time web search using Tavily
- AI-powered grounded responses
- Relevant image retrieval
- Source-aware reasoning
- Live information retrieval

---

## 🧠 Custom Memory System

A custom-built conversation memory layer designed to improve response quality and reduce unnecessary database reads.

### Features

- Redis-powered short-term memory
- Automatic conversation caching
- Context retrieval for every prompt
- Sliding context window
- Memory synchronization with MongoDB
- Fast conversation restoration
- Persistent chat history
- Reduced LLM context overhead

---

## ⚡ Multi-Agent Architecture

- LangGraph workflow orchestration
- Intelligent agent routing
- Shared conversation state
- Modular AI agent architecture
- Extensible workflow design

---

## 🎨 Modern UI

- Responsive interface
- Clean chat experience
- Dark theme
- Modern component-based architecture
- Redux state management

---

# 🏗️ Architecture

```text
                        ┌────────────────────┐
                        │      React UI      │
                        └─────────┬──────────┘
                                  │
                                  ▼
                     Express API Gateway
                                  │
            ┌─────────────────────┼─────────────────────┐
            ▼                                           ▼
 Authentication Service                        Agent Service
                                                    │
                                          LangGraph Workflow
                                                    │
                       ┌────────────────────────────┼────────────────────────────┐
                       ▼                            ▼                            ▼
                  Chat Agent                 Search Agent                Future Agents
                       │                            │
                       └──────────────┬─────────────┘
                                      ▼
                             OpenAI GPT OSS
                                      │
                     ┌────────────────┼────────────────┐
                     ▼                                 ▼
              Redis Memory                      MongoDB
```

---

# 🚀 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Axios
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- REST APIs
- Express Gateway

---

## AI & LLM

- LangChain
- LangGraph
- OpenAI GPT OSS
- Tavily Search API

---

## Authentication

- Firebase Authentication
- Google OAuth

---

## Database & Storage

- MongoDB
- Redis

---

## DevOps

- Docker
- Git
- GitHub

---

# 📂 Project Structure

```text

│
├── frontend
│   ├── src
│   ├── public
│   └── utils
│
├── backend
│   ├── gateway
│   ├── services
│   │   ├── auth
│   │   ├── chat
│   │   └── agent
│   └── shared
│
└── docker-compose.yml
```

---

# 🚀 Current Progress

## ✅ Completed

- Google Authentication
- Secure API Authentication
- Chat Agent
- Search Agent
- Custom Redis Memory System
- MongoDB Conversation Storage
- LangGraph Agent Routing
- Multi-Agent Architecture
- Persistent Chat History
- Responsive User Interface
- Docker Configuration

---

# 🔮 Upcoming Features

- 💻 AI Coding Agent
- 📄 PDF Question Answering Agent
- 📊 AI PowerPoint Generation
- 🖼️ AI Image Generation Agent
- 📂 File Upload & Processing
- 🎙️ Voice Conversations
- 💳 Credit-Based Billing System
- 📈 Usage Analytics Dashboard
- ⚡ Streaming AI Responses
- 🧠 Long-Term Memory
- 🌍 Production Deployment

---

# 📸 Preview

> UI screenshots and demo video will be added soon.

---

# ⚙️ Installation

Clone the repository

```bash
git clone [https://github.com/yourusername/AestheAI](https://github.com/khushi2758/Ai-agent).git
```

Install dependencies

```bash
npm install
```

Start development

```bash
npm run dev
```

---

# 🔧 Environment Variables

Create a `.env` file.

```env
OPENAI_API_KEY=

MONGODB_URI=

REDIS_URL=

TAVILY_API_KEY=

FIREBASE_PROJECT_ID=

JWT_SECRET=
```

---

# 🎯 Project Goals

- Build a scalable Multi-Agent AI platform
- Explore AI orchestration using LangGraph
- Create reusable AI agents
- Implement efficient conversation memory
- Deliver production-ready architecture
- Continuously expand AI capabilities

---

# 🤝 Contributing

Contributions, ideas, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

# ⭐ Support

If you found this project interesting, please consider giving it a ⭐ on GitHub.

It helps the project grow and motivates further development.

---

# 📬 Connect

**GitHub**

https://github.com/yourusername

**LinkedIn**

https://linkedin.com/in/your-profile

---

# 📜 License

This project is licensed under the MIT License.

---

## 🚀 AestheAI

**Building an intelligent, scalable, and modular Multi-Agent AI Platform—one agent at a time.**
