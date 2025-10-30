import './WeatherInfoCard.css';

export default function WeatherInfoCard({label, icon, value, recordedTime, startTime, endTime}: {label: string, icon?: React.ReactNode, value: any, recordedTime?: string, startTime?: string, endTime?: string}) {
  return (
    <div className="weather-info-card">
      <div className="weather-info-card-header">
        {icon && (
          <span className="weather-info-card-icon">{icon}</span>
        )}
        <span className="weather-info-card-label">{label}</span>
      </div>
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