<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&pause=1000&color=4F8EF7&center=true&vCenter=true&width=600&lines=DocDiscovery+AI;Chat+with+your+PDF+Documents;Powered+by+RAG+%2B+Claude+AI" alt="Typing SVG" />

<br/>

**An AI-powered PDF Question Answering system using Retrieval-Augmented Generation (RAG)**

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Claude AI](https://img.shields.io/badge/Claude-AI-CC785C?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

> Upload any PDF document — company reports, research papers, legal policies, manuals — and instantly get AI-generated answers from the content using Claude AI and semantic vector search.

</div>

---

## ✨ Features

- 📄 **PDF Upload** — Drag & drop or click to upload any PDF document
- 🔍 **Semantic Search** — Finds the most relevant content using vector embeddings
- 🤖 **AI Answers** — Claude AI generates precise answers grounded in your PDF
- 🧩 **RAG Pipeline** — Full Retrieval-Augmented Generation architecture
- 💬 **Chat Interface** — Clean, modern conversational UI with typing indicators
- 🔒 **Context-Aware** — AI only answers from the uploaded document, never hallucinates
- 🆓 **Free Embeddings** — Uses local open-source model, no OpenAI key needed

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
│  ┌──────────────┐  Upload PDF  ┌──────────────────────────────┐ │
│  │  Upload Zone │ ──────────── │  Chat Interface              │ │
│  │  Drag & Drop │              │  Ask Questions → Get Answers │ │
│  └──────────────┘              └──────────────────────────────┘ │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP (Axios)
┌───────────────────────────────▼─────────────────────────────────┐
│                        BACKEND (Express.js)                      │
│                                                                  │
│  POST /api/upload              POST /api/chat                    │
│  ┌──────────────────┐          ┌─────────────────────────────┐  │
│  │ 1. Extract text  │          │ 1. Embed question           │  │
│  │    (pdf-parse)   │          │ 2. Vector Search (MongoDB)  │  │
│  │ 2. Chunk text    │          │ 3. Build context            │  │
│  │ 3. Embed chunks  │          │ 4. Ask Claude AI            │  │
│  │ 4. Save to DB    │          │ 5. Return answer            │  │
│  └──────────────────┘          └─────────────────────────────┘  │
└────────────┬───────────────────────────────────┬────────────────┘
             │                                   │
  ┌──────────▼──────────┐            ┌───────────▼──────────────┐
  │  MongoDB Atlas      │            │   Anthropic Claude API   │
  │  ┌───────────────┐  │            │   (Answer Generation)    │
  │  │   documents   │  │            └──────────────────────────┘
  │  │   chunks      │  │
  │  │  (embeddings) │  │
  │  └───────────────┘  │
  │  Vector Search Index│
  └─────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite | UI framework |
| **Styling** | Tailwind CSS v3 | Component styling |
| **HTTP Client** | Axios | API communication |
| **Backend** | Node.js + Express | REST API server |
| **Database** | MongoDB Atlas | Document & chunk storage |
| **Vector Search** | MongoDB Atlas Vector Search | Semantic similarity search |
| **Embeddings** | `@xenova/transformers` (local) | Free, offline text embeddings |
| **LLM** | Anthropic Claude | Answer generation |
| **PDF Parsing** | `pdf-parse` | Text extraction from PDFs |

---

## 📁 Project Structure

```
DocDiscovery/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── apiController.js    # Request handlers
│   │   ├── models/
│   │   │   ├── Document.js         # MongoDB Document schema
│   │   │   └── Chunk.js            # MongoDB Chunk schema (with embeddings)
│   │   ├── routes/
│   │   │   └── api.js              # Express routes
│   │   ├── services/
│   │   │   ├── embeddingService.js # Local embedding generation
│   │   │   ├── llmService.js       # Claude API integration
│   │   │   └── pdfService.js       # PDF text extraction
│   │   └── utils/
│   │       └── chunker.js          # Text chunking with overlap
│   ├── uploads/                    # Temporary PDF storage
│   ├── server.js                   # Express app entry point
│   └── .env.example                # Environment variable template
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Upload.jsx           # Drag & drop PDF uploader
    │   │   ├── Chat.jsx             # Chat interface with history
    │   │   └── Message.jsx          # Individual chat message bubble
    │   ├── services/
    │   │   └── api.js               # Axios API calls
    │   └── App.jsx                  # Root component & state
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB Atlas** account (free tier works)
- **Anthropic API Key** — get one at [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the Repository

```bash
git clone https://github.com/TarunPanwar684/DocDiscovery.git
cd DocDiscovery
```

### 2. Set Up MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Go to **Database** → **Connect** → **Drivers** and copy your connection string
3. Create a **database user** with a password

### 3. Configure Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### 4. Create the MongoDB Vector Search Index

Run this one-time setup script to create the required vector search index:

```bash
node createIndex.js
```

> **Note:** This requires at least one document in the `chunks` collection. Upload a PDF first, then run this script — or it will still create the index on an empty collection.

Alternatively, in the MongoDB Atlas UI:
- Go to **Atlas Search** → **Create Index** → **JSON Editor**
- Collection: `chunks`, Index Name: `vector_index`
- Paste this definition:

```json
{
  "fields": [
    {
      "numDimensions": 384,
      "path": "embedding",
      "similarity": "cosine",
      "type": "vector"
    }
  ]
}
```

### 5. Set Up Frontend

```bash
cd ../frontend
npm install
```

### 6. Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
node server.js
# → Server running on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# → App running on http://localhost:5173
```

---

## 📡 API Reference

### `POST /api/upload`

Upload and process a PDF file.

| Parameter | Type | Description |
|---|---|---|
| `file` | `FormData` | The PDF file to upload |

**Response:**
```json
{
  "message": "File uploaded and processed successfully",
  "documentId": "683e83...",
  "chunksProcessed": 42
}
```

---

### `POST /api/chat`

Ask a question about the uploaded PDF.

**Request Body:**
```json
{
  "question": "What does this company do?"
}
```

**Response:**
```json
{
  "answer": "According to the document, the company...",
  "sources": [
    { "text": "...relevant chunk 1...", "score": 0.92 },
    { "text": "...relevant chunk 2...", "score": 0.89 }
  ]
}
```

---

## 🧠 How RAG Works in This App

```
User Question
     │
     ▼
Generate Embedding (384-dim vector)
     │
     ▼
Vector Search in MongoDB Atlas
(cosine similarity against all stored chunk embeddings)
     │
     ▼
Retrieve Top 5 Most Relevant Chunks
     │
     ▼
Build Prompt: System Prompt + Context + Question
     │
     ▼
Send to Claude API
     │
     ▼
Answer grounded in your PDF ✅
```

**Chunking Strategy:**
- Chunk size: `500 characters`
- Overlap: `50 characters` (preserves context across chunk boundaries)
- Smart word-boundary splitting (never cuts mid-word)

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Backend port (default: `5000`) |
| `MONGODB_URI` | ✅ Yes | MongoDB Atlas connection string |
| `ANTHROPIC_API_KEY` | ✅ Yes | Claude API key from Anthropic Console |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by [Tarun Panwar](https://github.com/TarunPanwar684)

⭐ **Star this repo** if you found it useful!

</div>
