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

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setSelectedFile(file)
      setMessage('')
      setError('')
      setDownloadFilename('')
    } else {
      setError('Please select a valid CSV file')
      setSelectedFile(null)
    }
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
      setError('Failed to connect to server. Make sure the backend is running.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (downloadFilename) {
      window.location.href = `${API_URL}/api/download/${downloadFilename}`
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>PhonePe & Swipe CSV Processor</h1>
        <p className="subtitle">Upload your CSV file to extract PhonePe and Swipe transactions</p>

        <div className="upload-section">
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
              {selectedFile ? selectedFile.name : 'Choose CSV File'}
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || processing}
            className="btn btn-primary"
          >
            {processing ? 'Processing...' : 'Process File'}
          </button>
        </div>

        {message && (
          <div className="message success">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="message error">
            ❌ {error}
          </div>
        )}

        {downloadFilename && (
          <div className="download-section">
            <button onClick={handleDownload} className="btn btn-download">
              📥 Download Processed File
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
