import { useState } from 'react'
import './App.css'

// Configure API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [downloadFilename, setDownloadFilename] = useState('')
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    processFile(file)
  }

  const processFile = (file) => {
    if (file && file.type === 'text/csv') {
      setSelectedFile(file)
      setMessage('')
      setError('')
      setDownloadFilename('')
    } else if (file) {
      setError('Please select a valid CSV file')
      setSelectedFile(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first')
      return
    }

    setProcessing(true)
    setMessage('')
    setError('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('File processed successfully!')
        setDownloadFilename(data.download_filename)
      } else {
        setError(data.error || 'Failed to process file')
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again later.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (downloadFilename) {
      window.location.href = `${API_URL}/api/download/${downloadFilename}`
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setMessage('')
    setError('')
    setDownloadFilename('')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Professional Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Sri Laxmi Narasimha Filling Station
              </h1>
              <p className="text-blue-200 text-sm font-medium">
                Sirikonda • Transaction Management System
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm font-medium">CSV Processor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">

        {/* Upload Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden animate-fade-in">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/20 backdrop-blur-sm rounded-xl mb-4">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Upload Transaction File</h3>
              <p className="text-white/60 text-sm">Extract PhonePe, Swipe, and Cash transactions with totals</p>
            </div>
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 mb-6 group cursor-pointer
                ${isDragging 
                  ? 'border-indigo-400/70 bg-indigo-500/20 scale-[1.02]' 
                  : selectedFile 
                    ? 'border-emerald-400/70 bg-emerald-500/20' 
                    : 'border-white/30 bg-white/5 hover:border-indigo-400/50 hover:bg-white/10'
                }
              `}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                id="file-input"
                className="hidden"
              />

              {!selectedFile ? (
                <label htmlFor="file-input" className="cursor-pointer block">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 transform transition-transform hover:scale-110">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Drop your CSV file here
                    </h3>
                    <p className="text-sm text-white/70 mb-1">
                      or <span className="text-white font-medium underline">click to browse</span>
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      CSV files only • Max 16MB
                    </p>
                  </div>
                </label>
              ) : (
                <div className="flex items-center gap-4 animate-fade-in">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex-shrink-0 w-8 h-8 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 hover:rotate-90"
                  >
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Process Button */}
            {selectedFile && !downloadFilename && (
              <button
                onClick={handleUpload}
                disabled={processing}
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl border border-white/30 hover:border-white/50 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 animate-fade-in"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Process File</span>
                  </>
                )}
              </button>
            )}

            {/* Success Message */}
            {message && (
              <div className="mt-6 p-4 bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-xl animate-slide-in">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-emerald-300 mb-1">Success</p>
                    <p className="text-sm text-white/80">{message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl animate-slide-in">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-300 mb-1">Error</p>
                    <p className="text-sm text-white/80">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Download Section */}
            {downloadFilename && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="p-4 bg-emerald-500/5 backdrop-blur-sm border border-emerald-400/20 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-emerald-300">File Processed Successfully</h4>
                      <p className="text-xs text-white/60">Your transaction data is ready for download</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download Processed File</span>
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium py-3 px-6 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Process Another File</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Information Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-sm font-medium text-white/80 mb-4 text-center">Supported Transaction Types</h4>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 mx-auto bg-blue-500/20 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-white">PhonePe</p>
                <p className="text-xs text-white/50">Digital</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 mx-auto bg-purple-500/20 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-white">Swipe</p>
                <p className="text-xs text-white/50">Card</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 mx-auto bg-emerald-500/20 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-white">Cash</p>
                <p className="text-xs text-white/50">Physical</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Minimalistic Footer */}
        <div className="mt-16 pt-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-white/80 text-sm font-medium">
              Crafted by EasyLearnova Solutions
            </p>
          </div>
          
          <p className="text-white/60 text-sm mb-6">
            Want automated solutions for your business? Reach out to us
          </p>
          
          <a 
            href="https://my-portfolio-olive-psi-69.vercel.app/#bottom" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Reach Out</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
