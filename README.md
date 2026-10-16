# 🤖 AestheAI — Multi-Agent AI Platform

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Memory-DC382D?logo=redis&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-Agent%20Workflows-7C3AED)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451)
![License](https://img.shields.io/badge/License-MIT-yellow)

**AestheAI is a full-stack multi-agent AI workspace that brings conversational AI, coding assistance, PDF processing, PowerPoint generation, vision, and web search together in one application.**

Built with React, Node.js, Express, LangChain, LangGraph, Redis, and MongoDB, AestheAI is designed around specialised AI agents, a modular backend architecture, persistent conversation history, and user-based credit management.

Rather than relying on a single interaction mode for every task, the platform provides dedicated modes for different use cases, with an Auto mode designed to route requests to the appropriate agent.

---

## ✨ Key Features

### 🤖 1. Seven AI Modes

AestheAI provides a unified interface for interacting with specialised AI capabilities.

| Mode | Description |
|---|---|
| ⚡ **Auto** | Selects an appropriate agent for a user's request through the routing workflow. |
| 💬 **Chat** | Supports conversational interactions and context-aware responses. |
| 💻 **Coding** | Provides a dedicated mode for programming-related assistance. |
| 📄 **PDF** | Provides a dedicated mode for PDF and document-related tasks. |
| 📊 **PPT** | Provides a dedicated mode for presentation creation. |
| 👁️ **Vision** | Provides a dedicated mode for image-related understanding and analysis. |
| 🌐 **Search** | Supports web search and information retrieval using Tavily. |

The availability of individual capabilities depends on their backend implementation and configured AI providers.

### 🔐 2. Authentication & Session Management

- Google sign-in integration using Firebase Authentication.
- Backend authentication endpoints.
- Protected API routes through the API Gateway.
- Login and logout functionality.
- User-specific sessions and conversations.
- JWT-based authentication components.
- Redis-backed session storage.
- User account and plan information management.

### 💬 3. Conversational AI

- Dedicated Chat mode.
- Multi-turn conversational interactions.
- Conversation history persistence using MongoDB.
- Context retrieval for ongoing conversations.
- Markdown-compatible responses.
- Integration with the agent workflow.

### 🌐 4. AI-Powered Web Search

- Tavily API integration.
- Web information retrieval.
- AI-generated responses informed by search results.
- Search functionality integrated with the multi-agent architecture.

### 🧠 5. Custom Memory System

AestheAI uses Redis and MongoDB to support fast session access and persistent conversation storage.

**Redis — Fast access**
- Session storage and retrieval.
- Conversation caching where configured.
- Fast access to cached context.
- Synchronisation of updated user information in Redis sessions.

**MongoDB — Persistent storage**
- User and payment records.
- Persistent conversation data.
- Data storage across application sessions.

The separation between caching and persistent storage helps the application manage frequently accessed data without treating the cache as the permanent source of truth.

### ⚡ 6. Multi-Agent Workflow Orchestration

- LangGraph-based workflow orchestration.
- Modular agent architecture.
- Dedicated agent modes.
- Backend API routing through an Express Gateway.
- Separation of authentication, chat, and agent responsibilities.
- Extensible design for introducing additional agents and workflows.

### 💳 7. Credit-Based Billing & Payments

AestheAI includes a plan-based billing workflow using Razorpay.

- Razorpay order creation.
- Backend payment verification.
- Payment records stored in MongoDB.
- Plan-based credit allocation.
- User plan and credit updates after payment.
- Redis session synchronisation following account updates.

The payment workflow should verify payment status on the backend and prevent duplicate credit allocation before being used in production.

### 🎨 8. Frontend & User Experience

- React-based interface.
- Responsive application layout.
- Dedicated AI mode selector.
- Redux Toolkit for state management.
- Tailwind CSS styling.
- Axios for API communication.
- Lucide icons.
- Unified interface for accessing different AI capabilities.

### 🐳 9. Development Infrastructure

- Modular backend services.
- Docker configuration.
- Environment-based configuration.
- Git and GitHub version control.
- REST API communication between the frontend, gateway, and backend services.

---

## 🏗️ System Architecture

AestheAI follows a modular architecture with a frontend, API Gateway, backend services, AI workflow orchestration, data storage, and payment integration.

```text
                         ┌──────────────────────┐
                         │     React Frontend   │
                         │   Seven AI Modes     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express API Gateway│
                         │ Authentication/Proxy│
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
        ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
        │  Auth Service  │ │  Chat Service  │ │  Agent Service │
        └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
                │                  │                  │
                │                  │                  ▼
                │                  │         ┌─────────────────┐
                │                  │         │ LangGraph       │
                │                  │         │ Workflow        │
                │                  │         └────────┬────────┘
                │                  │                  │
                │                  │                  ▼
                │                  │         ┌─────────────────┐
                │                  │         │ Agent Routing   │
                │                  │         └────────┬────────┘
                │                  │                  │
                │                  │       ┌──────────┼──────────┐
                │                  │       ▼          ▼          ▼
                │                  │     Chat       Search    Other Modes
                │                  │       │          │
                └──────────────────┼──────────┬───────┘
                                   │          │
                                   ▼          ▼
                              ┌────────┐  ┌─────────┐
                              │ Redis  │  │ MongoDB │
                              │ Cache  │  │ Storage │
                              └────────┘  └─────────┘

                         ┌──────────────────────┐
                         │    Billing Service   │
                         └──────────┬───────────┘
                                    ▼
                         ┌──────────────────────┐
                         │  Razorpay Payments   │
                         └──────────────────────┘
```

*Conceptual overview. The actual connections and service boundaries depend on the implementation in the repository.*

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Tailwind CSS |
| State Management | Redux Toolkit |
| HTTP Communication | Axios |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| API Architecture | REST APIs, Express API Gateway |
| AI Orchestration | LangChain, LangGraph |
| Language Models | Configured LLM provider |
| Web Search | Tavily API |
| Authentication | Firebase Authentication, JWT components |
| Database | MongoDB, Mongoose |
| Session & Memory | Redis |
| Payment Gateway | Razorpay |
| Containerisation | Docker |
| Version Control | Git, GitHub |

---

## 📂 Project Structure

```text
AestheAI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── utils/
│
├── backend/
│   ├── gateway/
│   ├── services/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── agent/
│   │   │   ├── agents/
│   │   │   │   ├── chat.agent.js
│   │   │   │   └── search.agent.js
│   │   │   └── utils/
│   │   └── billing/
│   └── shared/
│
├── docker-compose.yml
└── README.md
```

*This is a representative structure. Adjust directory names to match the actual repository, particularly the locations of the billing service, agent workflows, and shared utilities.*

---

## 🚧 Development Progress

### Implemented or integrated

The following reflects features described during development; individual features should be tested end-to-end before being labelled production-ready.

- [x] React frontend and AI mode selector
- [x] Google authentication integration
- [x] Backend authentication endpoints
- [x] Protected API routing
- [x] Login and logout flows
- [x] Redis-backed session management
- [x] Chat agent
- [x] Search agent integration
- [x] LangGraph workflow and agent routing
- [x] MongoDB conversation persistence
- [x] Custom Redis memory and caching
- [x] Modular backend services
- [x] Razorpay order creation
- [x] Payment verification flow
- [x] Plan and credit update logic
- [x] Redis session synchronisation after user updates
- [x] Docker configuration

### Agent modes visible in the interface

- [x] Auto
- [x] Chat
- [x] Coding
- [x] PDF
- [x] PPT
- [x] Vision
- [x] Search

**Note:** The checklist above confirms that these modes are present in the interface. Mark each individual agent as fully implemented only when its underlying functionality works end-to-end.

---

## 🔮 Planned Enhancements

Potential next steps for the platform include:

- [ ] Complete and test all seven agent workflows end-to-end.
- [ ] PDF upload, parsing, and question answering.
- [ ] Coding agent execution and code analysis.
- [ ] PowerPoint generation and downloadable presentations.
- [ ] Vision model integration and image input handling.
- [ ] Streaming AI responses.
- [ ] File upload and processing pipeline.
- [ ] Advanced long-term conversational memory.
- [ ] Usage analytics dashboard.
- [ ] Production deployment.
- [ ] Automated tests and service monitoring.
- [ ] Payment webhook handling and duplicate-payment protection.
- [ ] Improved error handling and rate limiting.

---

## ⚙️ Installation & Setup

### Prerequisites

Install or configure:

- Node.js and npm.
- MongoDB.
- Redis.
- Firebase project credentials.
- API credentials for the selected language model.
- Tavily API key for web search.
- Razorpay test credentials for payment development.
- Docker, if running the application through Docker Compose.

### 1. Clone the Repository

```bash
git clone https://github.com/KhushiBera/Ai-agent.git
cd Ai-agent
```

### 2. Install Dependencies

Install dependencies in the frontend and each backend service directory containing a `package.json`.

For example:

```bash
cd frontend
npm install
```

Repeat this step for the gateway and relevant backend services.

### 3. Configure Environment Variables

Create separate `.env` files as required by your service configuration.

Example template:

```env
# Database
MONGODB_URI=

# Redis
REDIS_URL=

# AI providers
OPENAI_API_KEY=
TAVILY_API_KEY=

# Authentication
FIREBASE_PROJECT_ID=
JWT_SECRET=

# Service URLs
AUTH_SERVICE=
AUTH_SERVICE_URL=
BILLING_SERVICE_URL=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

Use the exact variable names expected by your code. Not every variable will be needed by every service.

**Security:** Never commit real API keys, database credentials, payment secrets, or JWT secrets to a public repository.

### 4. Start the Application

Run each service using the scripts defined in its `package.json`, or use Docker Compose if it is configured to start the complete application.

```bash
npm run dev
```

Run this command from the directory that defines the `dev` script. The precise startup sequence depends on your service configuration.

---

## 🔐 Security & Reliability

Before deploying AestheAI publicly, ensure that the following protections are in place:

- Validate user identity and permissions on protected endpoints.
- Keep service credentials and secrets in environment variables.
- Validate Razorpay signatures on the backend.
- Confirm payment status before granting credits.
- Make payment processing idempotent to prevent duplicate credit allocation.
- Secure internal user-plan update endpoints.
- Validate user input and handle API errors consistently.
- Configure CORS for trusted frontend origins.
- Avoid logging passwords, authentication tokens, or sensitive payment data.
- Apply rate limiting and appropriate timeouts to API and AI endpoints.

---

## 🎯 Project Objectives

- Build a unified workspace for multiple specialised AI agents.
- Explore workflow orchestration using LangGraph.
- Develop a modular, extensible backend architecture.
- Implement conversational context and persistent chat history.
- Combine authentication, session management, and data persistence.
- Integrate credit-based billing through Razorpay.
- Improve AI application performance through caching and memory management.
- Expand the platform with document, coding, presentation, and vision capabilities.

---

## 🤝 Contributing

Contributions, suggestions, bug reports, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

---

## 📸 Screenshots & Demo

Add screenshots or a demo video here to showcase the seven AI modes, chat interface, authentication flow, and billing experience.

---

## 📬 Connect

- **GitHub:** [Khushi Bera](https://github.com/KhushiBera)
- **LinkedIn:** [Khushi Bera](https://linkedin.com/in/KhushiBera)

---

## 📜 License

This project is intended to use the MIT License. Include a `LICENSE` file containing the actual licence text in the repository before distributing it under that licence.

---

## 🚀 AestheAI

**One platform. Multiple specialised agents. A smarter way to work with AI.**
