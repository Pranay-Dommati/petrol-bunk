# 🚀 Quick Deployment Steps - DO THIS NOW

Your code is ready and pushed to GitHub! Follow these steps to deploy:

## Step 1: Go to Render Dashboard
👉 Visit: https://dashboard.render.com/
- Sign in with your GitHub account

## Step 2: Create Blueprint
1. Click **"New +"** button (top right)
2. Select **"Blueprint"**
3. Connect your GitHub account if not already connected
4. Select repository: **`Pranay-Dommati/petrol-bunk`**
5. Render will detect `render.yaml` ✅
6. You should see **2 services** listed:
   - phonepe-swipe-processor-api (Backend)
   - phonepe-swipe-processor-frontend (Frontend)
7. Click **"Apply"** button

## Step 3: Wait for Deployment (3-5 minutes)
- Both services will start building
- Watch the logs if you want
- Wait until both show **"Live"** status

## Step 4: Configure Frontend (IMPORTANT!)
1. Click on the **frontend service** (`phonepe-swipe-processor-frontend`)
2. Click **"Environment"** in the left sidebar
3. Click **"Add Environment Variable"**
4. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: Copy your backend URL (from backend service dashboard)
     - It will look like: `https://phonepe-swipe-processor-api.onrender.com`
5. Click **"Save Changes"**
6. Frontend will auto-redeploy (takes ~2-3 minutes)

## Step 5: Test Your App! 🎉

### Test Backend:
Open in browser: `https://phonepe-swipe-processor-api.onrender.com/api/health`
Should show: `{"status": "ok"}`

### Test Frontend:
1. Open: `https://phonepe-swipe-processor-frontend.onrender.com`
2. Upload a CSV file
3. Click "Process File"
4. Download the result

## 🎊 You're Done!

Your app is now live on Render with:
- ✅ Backend API running on Python/Flask
- ✅ Frontend running as static site
- ✅ Both connected and working together

## 📝 Save Your URLs

- Backend: `https://phonepe-swipe-processor-api.onrender.com`
- Frontend: `https://phonepe-swipe-processor-frontend.onrender.com`

## ⚠️ Important Note About Free Tier

Your app will **spin down after 15 minutes** of inactivity (Render free tier).
- First request after sleep takes ~30-60 seconds
- This is normal for free tier
- To keep it awake, use a service like UptimeRobot to ping every 10 minutes

## 📖 Need More Help?

See the complete guide: `DEPLOYMENT_GUIDE.md`

---

**Questions?** Check the logs in Render dashboard if something doesn't work!
