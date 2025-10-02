# Complete Render Deployment Guide - Full Stack

This guide covers deploying both the **Backend API** (Flask) and **Frontend** (React + Vite) to Render.

## 📋 Project Structure

- **Backend**: Flask API in root directory (`app.py`, `main.py`)
- **Frontend**: React + Vite app in `frontend/` directory

## ✅ Prerequisites

1. GitHub account with your code repository
2. Render account (sign up at [render.com](https://render.com) - free tier available)
3. All code committed and pushed to GitHub

## 🚀 Deployment Strategy

We'll deploy TWO services:
1. **Backend API** - Python Web Service (Flask + Gunicorn)
2. **Frontend** - Static Site (React + Vite)

---

## 📖 Step-by-Step Deployment

### Step 1: Prepare Your Code

Make sure all changes are committed:

```bash
git add .
git commit -m "Setup Render deployment for frontend and backend"
git push origin main
```

### Step 2: Deploy Using render.yaml (Easiest Method)

Your project already has a `render.yaml` configured for both services!

1. **Go to Render Dashboard**
   - Visit [https://dashboard.render.com/](https://dashboard.render.com/)
   - Sign in with your GitHub account

2. **Create New Blueprint**
   - Click **"New +"** → **"Blueprint"**
   - Select **"Connect GitHub"** and authorize Render
   - Choose repository: **`Pranay-Dommati/petrol-bunk`**
   - Render will detect `render.yaml` automatically
   - Review the services (should show 2 services)
   - Click **"Apply"** to deploy both services

3. **Services Created**
   Render will create:
   - ✅ `phonepe-swipe-processor-api` (Backend - Python)
   - ✅ `phonepe-swipe-processor-frontend` (Frontend - Static Site)

### Step 3: Configure Frontend Environment Variable

**IMPORTANT**: After both services deploy, you need to connect the frontend to the backend.

1. **Get Backend URL**
   - Go to your backend service dashboard
   - Copy the URL (e.g., `https://phonepe-swipe-processor-api.onrender.com`)

2. **Set Frontend Environment Variable**
   - Go to your frontend service dashboard
   - Click **"Environment"** in the left sidebar
   - Add this environment variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://phonepe-swipe-processor-api.onrender.com` (your backend URL)
   - Click **"Save Changes"**
   - Frontend will automatically redeploy with the new environment variable

### Step 4: Monitor Deployment

Watch the deployment logs:
- Backend deployment: ~2-3 minutes
- Frontend deployment: ~3-5 minutes (includes npm install and Vite build)

Both services will show "Live" status when ready!

### Step 5: Test Your Deployment

#### Test Backend API

1. **Health Check** (in browser or curl):
   ```
   https://phonepe-swipe-processor-api.onrender.com/api/health
   ```
   Should return: `{"status": "ok"}`

2. **API Endpoints Available**:
   - `GET /api/health` - Health check
   - `POST /api/upload` - Upload CSV file
   - `GET /api/download/<filename>` - Download processed file

#### Test Frontend

1. Open your frontend URL:
   ```
   https://phonepe-swipe-processor-frontend.onrender.com
   ```

2. **Test Full Workflow**:
   - Upload a CSV file
   - Click "Process File"
   - Wait for success message
   - Download the processed file

---

## 🔧 Alternative: Manual Deployment

If you prefer manual setup without using `render.yaml`:

### Deploy Backend Manually

1. **Create Web Service**
   - Dashboard → **New +** → **Web Service**
   - Connect repository: `Pranay-Dommati/petrol-bunk`
   - Configure:
     - **Name**: `phonepe-swipe-processor-api`
     - **Region**: Oregon (free)
     - **Branch**: `main`
     - **Root Directory**: _(leave blank)_
     - **Environment**: **Python 3**
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn app:app`
     - **Plan**: Free

2. **Environment Variables**
   - Add: `PYTHON_VERSION` = `3.11.9`

3. **Advanced Settings**
   - **Health Check Path**: `/api/health`

### Deploy Frontend Manually

1. **Create Static Site**
   - Dashboard → **New +** → **Static Site**
   - Connect repository: `Pranay-Dommati/petrol-bunk`
   - Configure:
     - **Name**: `phonepe-swipe-processor-frontend`
     - **Region**: Oregon (free)
     - **Branch**: `main`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
     - **Plan**: Free

2. **Environment Variables** (after backend is deployed)
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`

---

## 📝 Configuration Files Explained

### render.yaml
Defines infrastructure as code:
- **Backend service**: Python web service with Gunicorn, health checks
- **Frontend service**: Static site with Vite build, SPA routing

### Frontend Environment Variables
- **VITE_API_URL**: Backend API URL
  - Must start with `VITE_` for Vite to expose it to the app
  - Defaults to `http://localhost:5000` in development
  - Set to production backend URL in Render

### Backend Configuration
- **PORT**: Auto-provided by Render (usually 10000)
- **Host**: `0.0.0.0` (accepts external connections)
- **Debug**: `False` (production mode)
- **CORS**: Enabled for all origins (can restrict in production)

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

**Symptoms**: Upload fails, console shows CORS or network errors

**Solutions**:
1. ✅ Verify `VITE_API_URL` is set in frontend environment variables
2. ✅ Check backend URL is correct (should be HTTPS)
3. ✅ Ensure backend is "Live" (not spinning down)
4. ✅ Check browser console for exact error
5. ✅ Test backend health endpoint directly

### Backend "Application Failed to Respond"

**Solutions**:
1. ✅ Check logs in Render dashboard
2. ✅ Verify `requirements.txt` has all dependencies
3. ✅ Ensure `app.py` uses `PORT` environment variable (already configured)
4. ✅ Test health check endpoint

### Frontend Build Failed

**Solutions**:
1. ✅ Check build logs for specific errors
2. ✅ Verify `package.json` dependencies are correct
3. ✅ Ensure build command is: `npm install && npm run build`
4. ✅ Publish directory should be `dist`

### File Upload Not Working

**Solutions**:
1. ✅ Check file is CSV format
2. ✅ File size under 16MB (configured limit)
3. ✅ Check backend logs for processing errors
4. ✅ Verify `uploads/` and `processed/` folders exist (created automatically)

---

## ⚠️ Important Notes: Free Tier Limitations

### 1. Cold Starts
- Free tier services **spin down after 15 minutes** of inactivity
- First request after inactivity takes **~30-60 seconds** (cold start)
- **Workaround**: Use [UptimeRobot](https://uptimerobot.com/) or [Cron-job.org](https://cron-job.org/) to ping your backend every 10 minutes

### 2. Ephemeral File System
- Uploaded files are **lost when service restarts** or redeploys
- For production, use persistent storage:
  - AWS S3
  - Cloudinary
  - Google Cloud Storage
  - Render Persistent Disks (paid)

### 3. Build Minutes
- Free tier includes 750 build hours/month (plenty for most projects)

---

## 🔄 Updating Your Deployment

### Automatic Deploys (Recommended)

1. Enable auto-deploy in Render service settings
2. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Render automatically rebuilds and deploys

### Manual Deploys

1. Go to service dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 📊 Monitoring

### View Logs
1. Service dashboard → **"Logs"** tab
2. See real-time logs and errors
3. Filter by time range

### Metrics
- Request count
- Response times
- Error rates
- Available in service dashboard

---

## 💻 Local Development

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```
Runs on: `http://localhost:5000`

### Frontend
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
Runs on: `http://localhost:5173`

The frontend automatically uses `localhost:5000` when `VITE_API_URL` is not set.

---

## ✅ Production Deployment Checklist

- [ ] All code committed and pushed to GitHub
- [ ] Backend service deployed and showing "Live"
- [ ] Frontend service deployed and showing "Live"
- [ ] Backend health check returns `{"status": "ok"}`
- [ ] `VITE_API_URL` environment variable set in frontend
- [ ] Frontend can successfully upload CSV
- [ ] Frontend can download processed CSV
- [ ] Test with actual data file
- [ ] (Optional) Setup uptime monitoring
- [ ] Document your deployed URLs below

---

## 🔗 Your Deployed URLs

Update these after deployment:

- **Backend API**: `https://phonepe-swipe-processor-api.onrender.com`
- **Frontend**: `https://phonepe-swipe-processor-frontend.onrender.com`

---

## 🎯 API Endpoints Reference

### Health Check
```
GET /api/health
Response: {"status": "ok"}
```

### Upload CSV
```
POST /api/upload
Content-Type: multipart/form-data
Body: file (CSV file)

Response: {
  "message": "File processed successfully",
  "download_filename": "processed_filename.csv"
}
```

### Download Processed File
```
GET /api/download/<filename>
Response: File download
```

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Status Page](https://status.render.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Flask CORS Documentation](https://flask-cors.readthedocs.io/)

---

## 🆘 Need Help?

1. Check service logs in Render dashboard
2. Review error messages in browser console
3. Test backend health endpoint
4. Verify all environment variables are set
5. Check [Render Community Forum](https://community.render.com/)

---

## 🎉 Success!

Once both services are deployed and connected:
- Frontend will communicate with backend API
- Users can upload CSV files
- System processes PhonePe and Swipe transactions
- Users can download processed results

Your full-stack app is now live on Render! 🚀
