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
    // get the location from the request
    const location = req.query.location || 'Hong Kong Observatory';

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
            t.place === location
        );
        
        // Extract humidity data
        const humidityData = data.humidity?.data?.find((h) => 
            h.place === location
        );

        const rainfallData = data.rainfall?.data?.find((r) => 
            r.place === location
        );

        const lightningData = data.lightening?.data?.find((l) => 
            l.place === location
        );

        let uvIndexData = null;
        
        if (data.uvindex?.data?.length > 0) {
            if (data.uvindex?.data?.find((u) => 
                u.place === location
            )) {
                uvIndexData = data.uvindex?.data?.find((u) => 
                    u.place === location
                )
            } else {
                uvIndexData = data.uvindex?.data?.find((u) => 
                    u.place === "King's Park"
                )
            }
        }
        
        // Get weather icon and description
        const weatherIcon = data.icon?.[0] || 0;
        const weatherDescription = getWeatherDescription(weatherIcon);
        
        // Transform data for frontend
        const weatherData = {
            city: 'Hong Kong',
            temperature: {
                data: temperatureData,
                recordedTime: data.temperature?.recordedTime || new Date().toISOString()
            },
            description: weatherDescription,
            icon: weatherIcon,
            lightning: {
                data: lightningData,
                startTime: data.lightening?.startTime,
                endTime: data.lightening?.endTime
            },
            rainfall: {
                data: rainfallData,
                startTime: data.rainfall?.startTime || new Date().toISOString(),
                endTime: data.rainfall?.endTime || new Date().toISOString()
            },
            uvIndex: uvIndexData,
            humidity: {
                data: humidityData,
                recordedTime: data.humidity?.recordedTime || new Date().toISOString()
            },
            warningMessage: data.warningMessage || '',
            rainstormReminder: data.rainstormReminder,
            specialWeatherTips: data.specialWxTips,
            tropicalCycloneMessage: data.tcmessage,
            place: location || 'Hong Kong Observatory',
            updateTime: data.updateTime || new Date().toISOString()
        };
        
        res.json(weatherData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Helper function to get weather description from icon code
function getWeatherDescription(iconCode) {
    const descriptionMap = {
        50: 'Sunny',
        51: 'Sunny Periods',
        52: 'Sunny Intervals',
        53: 'Sunny Periods with A Few Showers',
        54: 'Sunny Intervals with Showers',
        60: 'Cloudy',
        61: 'Overcast',
        62: 'Light Rain',
        63: 'Rain',
        64: 'Heavy Rain',
        65: 'Thunderstorms',
        70: 'Fine (night-time on 1st Lunar Month)',
        71: 'Fine (night-time on 2nd–6th Lunar Month)',
        72: 'Fine (night-time on 7th–13th Lunar Month)',
        73: 'Fine (night-time on 14th–17th Lunar Month)',
        74: 'Fine (night-time on 18th–24th Lunar Month)',
        75: 'Fine (night-time on 25th–30th Lunar Month)',
        76: 'Mainly Cloudy (night-time)',
        77: 'Mainly Fine (night-time)',
        80: 'Windy',
        81: 'Dry',
        82: 'Humid',
        83: 'Fog',
        84: 'Mist',
        85: 'Haze',
        90: 'Hot',
        91: 'Warm',
        92: 'Cool',
        93: 'Cold'
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
