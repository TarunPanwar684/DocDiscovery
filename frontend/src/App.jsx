import React, { useState } from 'react';
import Upload from './components/Upload';
import Chat from './components/Chat';
import { FileText, BookOpen } from 'lucide-react';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600">
            DocDiscovery AI
          </h1>
        </div>
        
        {uploadedFile && (
          <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-100 text-sm font-medium">
            <FileText className="w-4 h-4" />
            <span>{uploadedFile}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {!uploadedFile ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-center max-w-2xl mb-10">
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                Chat with your Documents
              </h2>
              <p className="text-lg text-slate-600">
                Upload a PDF (reports, manuals, policies) and ask questions. Our AI will instantly find answers directly from the content.
              </p>
            </div>
            
            <Upload onUploadSuccess={(fileName) => setUploadedFile(fileName)} />
          </div>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Chat />
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;
