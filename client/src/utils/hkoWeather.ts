export const HKO_ICON_CAPTIONS: { [key: number]: string } = {
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

export function getHkoCaption(iconCode: number): string {
  return HKO_ICON_CAPTIONS[iconCode] || 'Unknown';
}

const HKO_ICON_EMOJIS: { [key: number]: string } = {
  50: '☀️',
  51: '🌤️',
  52: '⛅',
  53: '🌦️',
  54: '🌦️',
  60: '☁️',
  61: '☁️',
  62: '🌦️',
  63: '🌧️',
  64: '🌧️',
  65: '⛈️',
  70: '🌙',
  71: '🌙',
  72: '🌙',
  73: '🌙',
  74: '🌙',
  75: '🌙',
  76: '🌙☁️',
  77: '🌙',
  80: '🌬️',
  81: '🌵',
  82: '💧',
  83: '🌫️',
  84: '🌫️',
  85: '🌫️',
  90: '🔥',
  91: '🌤️',
  92: '🧥',
  93: '🥶'
};

export function getHkoEmoji(iconCode: number): string {
  return HKO_ICON_EMOJIS[iconCode] || '🌤️';
}


