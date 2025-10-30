import './WeatherInfoCard.css';

export default function WeatherInfoCard({label, value, recordedTime, startTime, endTime}: {label: string, value: any, recordedTime?: string, startTime?: string, endTime?: string}) {
  return (
    <div className="weather-info-card">
      <span className="weather-info-card-label">{label}</span>
      <span className="weather-info-card-value">{value}</span>
      {recordedTime && (
        <span className="weather-info-card-recorded-time">Recorded at {new Date(recordedTime).toLocaleString()}</span>
      )}
      {startTime && endTime && (
        <span className="weather-info-card-time-range">Tracked Time range: {new Date(startTime).toLocaleString()} - {new Date(endTime).toLocaleString()}</span>
      )}
    </div>
  );
}