import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadPDF } from '../services/api';
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Upload({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setStatus(null);

    try {
      const response = await uploadPDF(file);
      setStatus({ type: 'success', message: response.message });
      onUploadSuccess(file.name);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to upload and process PDF.' });
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isUploading} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {isUploading ? (
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          ) : (
            <UploadCloud className="w-12 h-12 text-slate-400" />
          )}
          
          <div>
            <p className="text-lg font-medium text-slate-700">
              {isUploading ? 'Processing PDF...' : (isDragActive ? 'Drop the PDF here' : 'Drag & drop a PDF, or click to select')}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Supports large PDF documents (reports, manuals, etc.)
            </p>
          </div>
        </div>
      </div>

      {status && (
        <div className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
          status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p>{status.message}</p>
        </div>
      )}
    </div>
  );
}
