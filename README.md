# 🌤️ Hong Kong Weather App

A beautiful, modern weather application that displays real-time weather conditions and temperature for Hong Kong using the official Hong Kong Observatory API.

## ✨ Features

- 🌡️ **Current Temperature** - Real-time temperature in Celsius
- 🌦️ **Weather Conditions** - Current weather description (sunny, rainy, cloudy, etc.)
- 💧 **Humidity** - Current humidity percentage
- 💨 **Wind Speed** - Current wind speed (when available)
- 📍 **Location** - Shows Hong Kong Observatory location
- ⚠️ **Weather Warnings** - Displays official weather warnings when active
- 🔄 **Refresh Button** - Update weather data manually
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient background and glass-morphism design

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies:**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

2. **Start the application:**
   ```bash
   # Start both backend and frontend (recommended)
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   cd client && npm start
   ```

3. **Open your browser:**
   - **Development:** `http://localhost:3000`
   - **Production:** `https://weather-6t3on0rl6-cherylaitts-projects.vercel.app/`

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│  Express Server │───▶│ Hong Kong Obs.  │
│   (Port 3000)   │    │   (Port 5001)   │    │      API        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 API Endpoints

- `GET /api/weather` - Fetches current weather data
- `GET /api/health` - Health check endpoint

## Comments

### What I like these codes
- I have enabled opportunity to get weather data from somewhere else in the get weather API.
- I have used reuable components on Frontend side to unify the styling and to keep the codes clean.

### What I dislike these codes
- Currently the user needs to click refresh button to refresh the data. It causes additional efforts to the user. It will be better if the data is automatically in sync with HK Observatory.
- It will be accurate if the icon data can be from one single source as it is now hardcoded in both Frontend and Backend sides.

## 📊 Data Source

This app uses the official **Hong Kong Observatory Open Data API**:
- **Endpoint:** `https://data.weather.gov.hk/weatherAPI/opendata/weather.php`
- **Parameters:** `dataType=rhrread&lang=en`
- **No API key required** - completely free!

## 🎨 Technologies Used

- **Frontend:** React 19, TypeScript, CSS3
- **Backend:** Express.js, Node.js
- **API:** Hong Kong Observatory Open Data API
- **Styling:** Modern CSS with gradients and glass-morphism effects

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both backend and frontend
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for Hong Kong weather enthusiasts!**# weather-app
