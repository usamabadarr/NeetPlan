import React from 'react';

type WeatherProps = {
  weather: {
    temp: string;
    weather: string;
    location: string;
  };
};

const WeatherWidget: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <div className="weather-widget">
      <h3>Current Weather for {weather.location}</h3>
      {weather ? (
        <>
          <p>Temperature: {weather.temp}</p>
          <p>Description: {weather.weather}</p>
        </>
      ) : (
        <p>Weather data unavailable</p>
      )}
    </div>
  );
};

export default WeatherWidget;

