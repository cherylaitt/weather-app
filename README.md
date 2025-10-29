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
   - **Production:** `http://localhost:5001`

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

## 🌐 Weather Icons

The app displays different emoji icons based on Hong Kong Observatory weather codes:

- ☀️ Sunny (50)
- ⛅ Partly Cloudy (51)
- ☁️ Cloudy/Overcast (52, 53, 64)
- 🌦️ Light Rain (60)
- 🌧️ Rain/Heavy Rain (61, 62, 65)
- ⛈️ Thunderstorm (63)
- ❄️ Snow (70)
- 🌫️ Mist/Fog/Haze (80, 81, 90)

## 🛠️ Development

### Backend Development
```bash
npm run server
# Backend runs on http://localhost:5001
```

### Frontend Development
```bash
cd client && npm start
# Frontend runs on http://localhost:3000
```

### Building for Production
```bash
npm run build
npm start
# Full app runs on http://localhost:5001
```

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
