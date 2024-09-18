import React from 'react';

type WeatherProps = {
  weather: {
    temperature: string;
    description: string;
  };
};

const WeatherWidget: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <div className="weather-widget">
      <h3>Current Weather</h3>
      {weather ? (
        <>
          <p>Temperature: {weather.temperature}</p>
          <p>Description: {weather.description}</p>
        </>
      ) : (
        <p>Weather data unavailable</p>
      )}
    </div>
  );
};

export default WeatherWidget;

