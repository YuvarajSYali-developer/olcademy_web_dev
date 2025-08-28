# 🌸 Perfume Shop - Modern E-commerce Website

A beautiful, responsive perfume shop built with React, Node.js, and MongoDB.

## 🚀 Quick Start (Windows)

### Option 1: One-Click Start (Recommended)
1. **Double-click** `start-app.bat`
2. Wait for both servers to start
3. Your browser will open automatically to http://localhost:5173

### Option 2: PowerShell
1. **Right-click** `start-app.ps1` → "Run with PowerShell"
2. Follow the prompts
3. Visit http://localhost:5173

## 🔧 Manual Setup

### Prerequisites
- Node.js (v16+) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### Steps
1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Visit the website**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🌟 Features

✅ **Fully Working Website**
- Beautiful product catalog
- Product detail pages
- Responsive design
- Image galleries
- Category filtering

✅ **Demo Mode** (when backend is unavailable)
- Shows sample products
- All functionality works
- No database required

✅ **Professional UI/UX**
- Modern design
- Smooth animations
- Mobile-friendly
- Loading states

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- **This is normal!** The app works without a database
- You'll see demo products instead
- To use real data: Install MongoDB or use MongoDB Atlas

### "Port already in use"
- Backend: Change port in `backend/server.js`
- Frontend: Vite will find an available port automatically

### "Module not found"
- Run `npm install` in both `backend` and `frontend` folders

### Check Application Health
```bash
node check-health.js
```

## 📁 Project Structure

```
perfume-shop/
├── backend/          # Node.js + Express server
├── frontend/         # React + Vite app
├── start-app.bat     # Windows startup script
├── start-app.ps1     # PowerShell startup script
├── check-health.js   # Health check utility
└── SETUP_INSTRUCTIONS.md  # Detailed setup guide
```

## 🎯 What You'll See

1. **Hero Section** - Beautiful landing area
2. **Featured Products** - Grid of luxury fragrances
3. **Product Details** - Full product pages with images
4. **Responsive Design** - Works on all devices

## 🔍 Health Check

Visit http://localhost:5000/api/health to check backend status.

## 📚 More Help

- **Detailed Setup**: See `SETUP_INSTRUCTIONS.md`
- **Health Check**: Run `node check-health.js`
- **Issues**: Check browser console and terminal output

---

**🎉 Your perfume shop is ready to go!** 

The application is designed to be resilient and will work even without a database connection, showing beautiful demo data to users.
