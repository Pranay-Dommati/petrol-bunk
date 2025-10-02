# PhonePe & Swipe CSV Processor

A web application to upload CSV files, process them to extract PhonePe and Swipe transactions, and download the processed results.

## Features

- 📤 Upload CSV files through a modern web interface
- ⚙️ Automatically processes transactions to extract PhonePe and Swipe data
- 📥 Download processed CSV files
- 🎨 Beautiful, responsive UI with gradient design

## Project Structure

```
.
├── app.py                    # Flask backend server
├── main.py                   # CSV processing logic
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── App.jsx          # Main UI component
│   │   └── App.css          # Styling
│   └── package.json
├── uploads/                  # Uploaded files (auto-created)
└── processed/               # Processed files (auto-created)
```

## Setup Instructions

### Backend (Flask)

1. **Install Python dependencies** (already configured):
   ```bash
   # Dependencies are already installed: flask, flask-cors, pandas
   ```

2. **Run the Flask backend**:
   ```bash
   python app.py
   ```
   The backend will start on `http://localhost:5000`

### Frontend (React)

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

## How to Use

1. **Start both servers**:
   - Terminal 1: Run `python app.py` (backend)
   - Terminal 2: Run `cd frontend && npm run dev` (frontend)

2. **Open the application**:
   - Navigate to `http://localhost:5173` in your browser

3. **Upload and process**:
   - Click "Choose CSV File" and select your CSV file
   - Click "Process File" to extract PhonePe and Swipe transactions
   - Click "Download Processed File" to get the results

## CSV Format

Your input CSV should have at least these columns:
- `Description`: Transaction description
- `Credit`: Credit amount

The processor will:
- Extract transactions containing "phonepe" as PHONE PAY
- Extract transactions containing "india transact", "hdfc", or "imps" as SWIPE
- Extract transactions containing "self" as CASH
- Calculate TOTAL for each row
- Add a grand TOTAL row at the bottom
- Output a CSV with columns: `S.NO`, `PHONE PAY`, `SWIPE`, `CASH`, `TOTAL`

## API Endpoints

- `POST /api/upload` - Upload and process CSV file
- `GET /api/download/<filename>` - Download processed file
- `GET /api/health` - Health check endpoint

## Technologies Used

- **Backend**: Flask, Flask-CORS, Pandas, Gunicorn
- **Frontend**: React, Vite, Tailwind CSS
- **Deployment**: Render (Backend + Frontend)

## 🚀 Deployment

This application is configured for easy deployment to Render with both frontend and backend.

### Quick Deploy to Render

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml` and deploy both services

3. **Configure Frontend**:
   - After deployment, go to frontend service
   - Add environment variable: `VITE_API_URL` = `<your-backend-url>`
   - Frontend will auto-redeploy

📖 **For detailed deployment instructions**, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Deployed URLs

- **Frontend**: `https://phonepe-swipe-processor-frontend.onrender.com`
- **Backend API**: `https://phonepe-swipe-processor-api.onrender.com`

## 📁 Environment Variables

### Frontend
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000  # For local development
# For production, set in Render: https://your-backend.onrender.com
```

### Backend
No environment variables needed for local development. For production:
- `PYTHON_VERSION=3.11.9` (auto-configured in render.yaml)
- `PORT` (auto-provided by Render)

## 🔧 Development

### Prerequisites
- Python 3.11.9
- Node.js 18+ and npm
- Git

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pranay-Dommati/petrol-bunk.git
   cd petrol-bunk
   ```

2. **Backend Setup**:
   ```bash
   pip install -r requirements.txt
   python app.py
   ```
   Runs on `http://localhost:5000`

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs on `http://localhost:5173`

## 📝 Project Files

- `app.py` - Flask backend API server
- `main.py` - CSV processing logic
- `render.yaml` - Render deployment configuration
- `requirements.txt` - Python dependencies
- `runtime.txt` - Python version specification
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `frontend/` - React frontend application
  - `src/App.jsx` - Main UI component
  - `src/App.css` - Styling
  - `package.json` - Node dependencies

