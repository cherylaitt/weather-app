const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
    try {
        console.log('Fetching weather data from Hong Kong Observatory...');
        
        // Call Hong Kong Observatory API with proper headers
        const response = await fetch(
            'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Hong Kong Weather App/1.0',
                    'Accept-Language': 'en-US,en;q=0.9'
                }
            }
        );
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Hong Kong Observatory API error: ${response.status} - ${errorText}`);
            throw new Error(`Hong Kong Observatory API responded with status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        
        // Extract temperature from Hong Kong Observatory data
        const temperatureData = data.temperature?.data?.find((t) => 
            t.place === 'Hong Kong Observatory'
        );
        
        // Extract humidity data
        const humidityData = data.humidity?.data?.find((h) => 
            h.place === 'Hong Kong Observatory'
        );
        
        // Get weather icon and description
        const weatherIcon = data.icon?.[0] || 0;
        const weatherDescription = getWeatherDescription(weatherIcon);
        
        // Transform data for frontend
        const weatherData = {
            temperature: temperatureData?.value || 0,
            description: weatherDescription,
            icon: weatherIcon,
            humidity: humidityData?.value || 0,
            windSpeed: 0, // Wind data not available in this API endpoint
            city: 'Hong Kong',
            warningMessage: data.warningMessage || '',
            place: temperatureData?.place || 'Hong Kong Observatory',
            updateTime: data.updateTime || new Date().toISOString()
        };
        
        console.log('Weather data fetched successfully:', {
            temperature: weatherData.temperature,
            description: weatherData.description,
            humidity: weatherData.humidity
        });
        
        res.json(weatherData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
        // Fallback to mock data if API is unavailable
        console.log('Using fallback weather data...');
        const fallbackData = {
            temperature: 25,
            description: 'Partly Cloudy',
            icon: 51,
            humidity: 75,
            windSpeed: 0,
            city: 'Hong Kong',
            warningMessage: '',
            place: 'Hong Kong Observatory',
            updateTime: new Date().toISOString(),
            isFallback: true
        };
        
        res.json(fallbackData);
    }
});

// Helper function to get weather description from icon code
function getWeatherDescription(iconCode) {
    const descriptionMap = {
        50: 'Sunny',
        51: 'Partly Cloudy',
        52: 'Cloudy',
        53: 'Overcast',
        60: 'Light Rain',
        61: 'Rain',
        62: 'Heavy Rain',
        63: 'Thunderstorm',
        64: 'Overcast',
        65: 'Rain',
        70: 'Snow',
        80: 'Mist',
        81: 'Fog',
        90: 'Haze'
    };
    return descriptionMap[iconCode] || 'Unknown';
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Hong Kong Weather API'
    });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌤️  Hong Kong Weather API Server running on port ${PORT}`);
    console.log(`📡 Weather API endpoint: http://localhost:${PORT}/api/weather`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log('Press Ctrl+C to quit.');
});
