import React, { useState, useEffect } from 'react';
import './App.css';

interface WeatherData {
  temperature: number;
  description: string;
  icon: number;
  humidity: number;
  windSpeed: number;
  city: string;
  warningMessage?: string;
  place: string;
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
      const response = await fetch('http://localhost:5001/api/weather');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      
        setWeather({
          temperature: data.temperature,
          description: data.description,
          icon: data.icon,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          city: data.city,
          warningMessage: data.warningMessage,
          place: data.place,
          isFallback: data.isFallback
        });
    } catch (err) {
      setError('Failed to load weather data. Please try again later.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="app-title">🌤️ Weather in Hong Kong</h1>
        
        {weather?.isFallback && (
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
                {weather.temperature}°C
              </div>
            </div>
            
            <div className="weather-details">
              <h2 className="weather-description">
                {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
              </h2>
              
              {weather.warningMessage && (
                <div className="weather-warning">
                  <span className="warning-icon">⚠️</span>
                  <span className="warning-text">{weather.warningMessage}</span>
                </div>
              )}
              
              <div className="weather-info">
                <div className="info-item">
                  <span className="info-label">💧 Humidity</span>
                  <span className="info-value">{weather.humidity}%</span>
                </div>
                {weather.windSpeed > 0 && (
                  <div className="info-item">
                    <span className="info-label">💨 Wind Speed</span>
                    <span className="info-value">{weather.windSpeed} m/s</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">📍 Location</span>
                  <span className="info-value">{weather.place}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">🌡️ Temperature</span>
                  <span className="info-value">{weather.temperature}°C</span>
                </div>
              </div>
            </div>
            
            <button onClick={fetchWeatherData} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
