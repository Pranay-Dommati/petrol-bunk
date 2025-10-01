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

- **Backend**: Flask, Flask-CORS, Pandas
- **Frontend**: React, Vite
- **Styling**: Custom CSS with gradients
