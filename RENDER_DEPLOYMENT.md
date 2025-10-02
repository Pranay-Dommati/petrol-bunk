# Render Deployment Guide

## Issues Fixed

### 1. Port Configuration ✅
- Updated `app.py` to use dynamic PORT from environment variable
- Changed `host` to `0.0.0.0` to accept external connections
- Disabled debug mode for production

### 2. Build & Start Commands ✅
- Created `render.yaml` with proper configuration
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app`

### 3. Dependencies ✅
- All required packages in `requirements.txt`
- Gunicorn included for production server

## Render Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`

3. **The deployment will use these settings automatically:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Environment: Python 3.11.9

### Option 2: Manual Configuration

If you prefer manual setup:

1. **Create New Web Service**
   - Environment: `Python`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

2. **Advanced Settings**
   - Python Version: `3.11.9`

## Environment Variables (if needed)

You can add these in Render dashboard if required:
- `PYTHON_VERSION`: `3.11.9`

## Common Issues & Solutions

### Issue: "Application failed to respond"
**Solution:** Make sure your app listens on `0.0.0.0` and uses the PORT environment variable (already fixed in app.py)

### Issue: "Module not found"
**Solution:** Ensure all imports in `main.py` and `app.py` are available in `requirements.txt`

### Issue: "Build failed"
**Solution:** Check that `requirements.txt` has correct package versions

### Issue: File permission errors
**Solution:** Render has an ephemeral filesystem. Files uploaded will be lost on restart. Consider using cloud storage (S3, Cloudinary) for production.

## Testing Your Deployment

Once deployed, test these endpoints:

1. **Health Check:**
   ```
   GET https://your-app.onrender.com/api/health
   ```

2. **Upload CSV:**
   ```
   POST https://your-app.onrender.com/api/upload
   Content-Type: multipart/form-data
   Body: file=your-file.csv
   ```

3. **Download Processed File:**
   ```
   GET https://your-app.onrender.com/api/download/processed_filename.csv
   ```

## Update Frontend

After deployment, update your frontend `App.jsx` to use the Render URL:

```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://your-app.onrender.com'
  : 'http://localhost:5000';

// Then use it in fetch calls:
const response = await fetch(`${API_URL}/api/upload`, {
  method: 'POST',
  body: formData,
});
```

## Important Notes

⚠️ **Render Free Tier Limitations:**
- Services spin down after 15 minutes of inactivity
- First request after inactivity takes ~30 seconds (cold start)
- Uploaded files are lost when service restarts (ephemeral storage)

💡 **For Production:**
Consider using persistent storage like:
- AWS S3
- Cloudinary
- Render Disks (paid feature)

## Logs

View logs in Render dashboard:
- Dashboard → Your Service → Logs
- Use logs to debug any deployment issues
