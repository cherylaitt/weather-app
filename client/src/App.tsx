import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherInfoCard from './components/molecules/WeatherInfoCard';
import Button from './components/atoms/Button';

interface WeatherData {
  temperature: {
    data: {
      place: string;
      value: number;
      unit: string;
    },
    recordedTime: string;
  };
  description: string;
  icon: number;
  uvIndex: {
    value: number;
    place: string;
    desc: string;
  };
  humidity: {
    data: {
      place: string;
      value: number;
      unit: string;
    },
    recordedTime: string;
  };
  lightning?: {
    data?: {
      place?: string;
      occur?: boolean;
    },
    startTime?: string;
    endTime?: string;
  };
  rainfall?: {
    data?: {
      place: string;
      unit: string;
      max: number;
      min: number;
    },
    startTime: string;
    endTime: string;
  };
  city: string;
  warningMessage?: string;
  specialWeatherTips?: string;
  rainstormReminder?: string;
  tropicalCycloneMessage?: string;
  place: string;
  updateTime: string;
  isFallback?: boolean;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call our backend API directly
      const response = await fetch('http://localhost:5001/api/weather?location=Hong Kong Observatory');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      
      setWeather(data as WeatherData);

    } catch (err) {
      setError('Failed to load weather data. Please try again later.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="weather-container">
          <div className="loading">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="weather-container">
          <div className="error">
            <h2>⚠️ Weather App</h2>
            <p>{error}</p>
            <p>This app uses the official Hong Kong Observatory API to provide real-time weather data for Hong Kong.</p>
            <p>If you're experiencing issues, please check that the backend server is running and try again.</p>
            <button onClick={fetchWeatherData} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="weather-container">
        <h1 className="app-title">Weather in {weather?.city}</h1>
        
        {!weather&& (
          <div className="fallback-notice">
            <span className="fallback-icon">⚠️</span>
            <span className="fallback-text">Using sample data - Hong Kong Observatory API temporarily unavailable</span>
          </div>
        )}
        
        {weather && (
          <div className="weather-card">
            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weather.icon)}
              </div>
              <div className="temperature">
                {weather.temperature.data.value}°C
              </div>
            </div>
            
            <div className="weather-details">
              <h2 className="weather-description">
                {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
              </h2>

              <div className="weather-info">
                <WeatherInfoCard
                  label="📍 Location"
                  value={weather.place}
                  recordedTime={''}
                />
                <WeatherInfoCard
                  label="🌡️ Temperature"
                  value={`${weather.temperature.data.value}°C`}
                  recordedTime={weather.temperature.recordedTime}
                />
                <WeatherInfoCard
                  label="💧 Humidity"
                  value={`${weather.humidity.data.value}${weather.humidity.data.unit === 'percent' ? '%' : ''}`}
                  recordedTime={weather.humidity.recordedTime}
                />
                <WeatherInfoCard
                  label="☀️ UV Index"
                  value={`${weather.uvIndex.value} - ${weather.uvIndex.desc}`}
                  recordedTime={''}
                />
                {weather.lightning && (
                  <WeatherInfoCard
                    label="⚡ Lightning"
                    value={weather.lightning?.data?.occur ? 'Detected' : 'None'}
                    recordedTime={weather.lightning.endTime || weather.lightning.startTime || ''}
                  />
                )}
                {weather.rainfall && weather.rainfall.data && (
                  <WeatherInfoCard
                    label="🌧️ Rainfall"
                    value={`${weather.rainfall.data.min}-${weather.rainfall.data.max} ${weather.rainfall.data.unit}`}
                    recordedTime={weather.rainfall.endTime || weather.rainfall.startTime}
                  />
                )}
              </div>
              
              {weather.warningMessage && (
                <div className="weather-warning">
                  <span className="warning-icon">⚠️</span>
                  <span className="warning-text">{weather.warningMessage}</span>
                </div>
              )}
              
              {weather.specialWeatherTips && (
                <div className="weather-tips">
                  <span className="tips-icon">💡</span>
                  <span className="tips-text">{weather.specialWeatherTips}</span>
                </div>
              )}
              
              {weather.rainstormReminder && (
                <div className="rainstorm-reminder">
                  <span className="reminder-icon">🌧️</span>
                  <span className="reminder-text">{weather.rainstormReminder}</span>
                </div>
              )}
              
              {weather.tropicalCycloneMessage && (
                <div className="cyclone-message">
                  <span className="cyclone-icon">🌀</span>
                  <span className="cyclone-text">{weather.tropicalCycloneMessage}</span>
                </div>
              )}
            </div>
            
            <div className="weather-footer">
              <div className="update-time">
                Last updated: {new Date(weather.updateTime).toLocaleString()}
              </div>
              <Button label="🔄 Refresh" onClick={fetchWeatherData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

const getWeatherIcon = (iconCode: number) => {
  // Hong Kong Observatory weather icon codes
  const iconMap: { [key: number]: string } = {
    50: '☀️', // Sunny
    51: '⛅', // Partly Cloudy
    52: '☁️', // Cloudy
    53: '☁️', // Overcast
    60: '🌦️', // Light Rain
    61: '🌧️', // Rain
    62: '🌧️', // Heavy Rain
    63: '⛈️', // Thunderstorm
    64: '☁️', // Overcast
    65: '🌧️', // Rain
    70: '❄️', // Snow
    80: '🌫️', // Mist
    81: '🌫️', // Fog
    90: '🌫️'  // Haze
  };
  return iconMap[iconCode] || '🌤️';
};