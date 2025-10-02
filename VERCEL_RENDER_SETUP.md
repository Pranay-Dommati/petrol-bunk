# ✅ Final Deployment Configuration

## 🎯 Your Setup

- **Frontend**: Vercel → `https://petrol-bunk.vercel.app/`
- **Backend**: Render → `https://phonepe-swipe-processor-api.onrender.com`

---

## 📋 Configuration Checklist

### ✅ Backend (Render) - DONE
- [x] Deployed at: `https://phonepe-swipe-processor-api.onrender.com`
- [x] CORS enabled for all origins (works with Vercel)
- [x] Health check endpoint: `/api/health`
- [x] Python 3.11.9 configured
- [x] Gunicorn running the app

### 🔄 Frontend (Vercel) - ACTION REQUIRED

You need to update your Vercel environment variable:

#### Steps:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Open your `petrol-bunk` project

2. **Add Environment Variable**
   - Go to: **Settings** → **Environment Variables**
   - Click **"Add New"**
   - Set:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://phonepe-swipe-processor-api.onrender.com`
     - **Environments**: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

3. **Redeploy**
   - Go to **Deployments** tab
   - Click the **"..."** menu on latest deployment
   - Select **"Redeploy"**
   - OR: Push any commit to trigger auto-deploy

---

## 🧪 Testing Your App

### Test Backend API
```bash
# Health check
curl https://phonepe-swipe-processor-api.onrender.com/api/health

# Should return:
{"status": "ok"}
```

### Test Full App
1. Open: `https://petrol-bunk.vercel.app/`
2. Upload a CSV file
3. Click "Process File"
4. Download the processed result

---

## 🔍 Troubleshooting

### If frontend can't connect to backend:

1. **Check VITE_API_URL is set in Vercel**
   - Settings → Environment Variables
   - Should be: `https://phonepe-swipe-processor-api.onrender.com`

2. **Check backend is running**
   - Visit: `https://phonepe-swipe-processor-api.onrender.com/api/health`
   - Should return: `{"status": "ok"}`

3. **Check browser console**
   - Open DevTools (F12)
   - Look for CORS or network errors
   - Backend CORS is already configured to allow all origins

4. **Cold Start Delay**
   - Render free tier spins down after 15 minutes
   - First request takes 30-60 seconds
   - This is normal!

---

## ⚡ Why This Setup is Great

✅ **Vercel for Frontend**:
- Fast global CDN
- Instant deployments
- Great for static sites
- No cold starts

✅ **Render for Backend**:
- Easy Python deployment
- Free tier available
- Automatic HTTPS
- Simple configuration

✅ **They work together perfectly!**:
- CORS already configured
- Just need to set `VITE_API_URL`
- No conflicts

---

## 🔄 Future Updates

### Update Frontend:
```bash
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys!
```

### Update Backend:
```bash
# Make changes to backend code
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys!
```

---

## 📝 Current Status

- ✅ Backend deployed on Render
- ✅ Frontend deployed on Vercel
- ⏳ **ACTION NEEDED**: Set `VITE_API_URL` in Vercel
- ⏳ **ACTION NEEDED**: Redeploy Vercel after setting env var

---

## 🎉 Once Complete

Your app will be fully functional at:
- **Public URL**: `https://petrol-bunk.vercel.app/`
- **API**: `https://phonepe-swipe-processor-api.onrender.com`

Users can:
- Upload CSV files
- Process PhonePe & Swipe transactions
- Download processed results

---

## 💡 Pro Tips

1. **Keep Backend Awake** (Render free tier):
   - Use [UptimeRobot](https://uptimerobot.com/) to ping every 10 minutes
   - Prevents cold starts

2. **Monitor Performance**:
   - Check Render dashboard for backend logs
   - Check Vercel analytics for frontend traffic

3. **Optimize Costs**:
   - Both free tiers are generous
   - Only upgrade if you need more resources

---

**Need Help?** Check the logs:
- **Vercel**: Deployments tab → Click deployment → View logs
- **Render**: Service dashboard → Logs tab
