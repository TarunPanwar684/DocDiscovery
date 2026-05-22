import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';

export default function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600 text-white ml-3' : 'bg-teal-600 text-white mr-3'
        }`}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`p-4 rounded-2xl ${
            isUser ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
          }`}>
            <div className="prose prose-sm max-w-none">
              {isUser ? (
                <p className="m-0 whitespace-pre-wrap">{message.content}</p>
              ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              )}
            </div>
          </div>
          
          {/* Sources Tag */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2 text-xs text-slate-500">
              <span className="font-medium">Sources:</span> Used {message.sources.length} document chunks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
