# Full-Stack AI-Powered PDF Question Answering

An assignment-level, full-stack application that allows users to upload PDF documents and ask questions about them using Retrieval-Augmented Generation (RAG).

## Architecture
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas (with Vector Search)
- **Embeddings**: Local, free `transformers.js` (`Xenova/all-MiniLM-L6-v2`)
- **LLM**: Anthropic Claude API (`claude-3-haiku-20240307`)

## Setup Instructions

### 1. MongoDB Atlas Setup
You need a MongoDB Atlas cluster (the free tier works fine).

#### Get Connection String
1. In your Atlas dashboard, click **Connect** -> **Drivers**.
2. Copy your connection string (replace `<password>` with your database user's password).

#### Create the Vector Search Index
For the vector search to work, you must manually create a Vector Search Index on the `chunks` collection.
1. In Atlas, go to **Database** -> **Browse Collections**.
2. Assuming your database is named `test`, click on the `chunks` collection.
3. Click on the **Atlas Search** tab, then **Create Search Index**.
4. Choose **JSON Editor**.
5. Select the database (`test`) and collection (`chunks`).
6. Set the Index Name to exactly: `vector_index`.
7. Paste the following JSON definition and click Next/Create:

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

Wait a few minutes for the index to build.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in your keys:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```
4. Run the server:
   ```bash
   node server.js
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open the frontend in your browser (usually `http://localhost:5173`).
2. Drag and drop a PDF file to upload it.
3. Once processed, type a question in the chat box.
4. The system will retrieve relevant chunks from the database and use Claude to generate an answer.
