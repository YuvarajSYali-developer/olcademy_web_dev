# Perfume Shop - Setup Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (optional - the app will work with demo data if MongoDB is not available)

### Option 1: Automatic Setup (Recommended)
1. **Windows**: Double-click `start-app.bat`
2. **PowerShell**: Right-click `start-app.ps1` → "Run with PowerShell"

### Option 2: Manual Setup
1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

## 🔧 Troubleshooting Common Issues

### Issue 1: "Cannot connect to MongoDB"
**Solution**: The app will work with demo data even without MongoDB!
- The backend will show a warning but continue running
- Frontend will display fallback product data
- To use real database: Install MongoDB or use MongoDB Atlas

### Issue 2: "Port already in use"
**Solution**: 
- Backend: Change port in `backend/server.js` (line 8)
- Frontend: Vite will automatically find an available port

### Issue 3: "Module not found" errors
**Solution**: 
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Issue 4: Frontend not loading
**Solution**: 
- Check if both servers are running
- Backend should be on http://localhost:5000
- Frontend should be on http://localhost:5173

## 📊 Database Setup (Optional)

### Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Run: `cd backend && npm run seed`

### MongoDB Atlas (Cloud)
1. Create free account at mongodb.com
2. Get connection string
3. Update `backend/server.js` line 25 with your connection string
4. Run: `cd backend && npm run seed`

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Products API**: http://localhost:5000/api/products

## 🎯 Features

✅ **Working Features**:
- Product browsing with fallback data
- Responsive design
- Product details page
- Image galleries
- Category filtering

⚠️ **Demo Mode** (when backend is unavailable):
- Shows sample products
- All functionality works with demo data
- Warning banner indicates demo mode

## 🆘 Still Having Issues?

1. **Check Console**: Look for error messages in browser console
2. **Check Terminal**: Backend terminal shows connection status
3. **Health Check**: Visit http://localhost:5000/api/health
4. **Restart**: Stop both servers (Ctrl+C) and restart

## 📝 Development Notes

- Frontend: React + Vite
- Backend: Node.js + Express + Mongoose
- Database: MongoDB (optional)
- Styling: CSS with responsive design
- Images: Unsplash (external URLs)

The application is designed to be resilient and will work even without a database connection, showing demo data to users.
