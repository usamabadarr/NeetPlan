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
      {weather.temp ? (
        <>
          <h3>Current Weather for {weather.location}</h3>
          <p>Temperature: {weather.temp}</p>
          <p>Description: {weather.weather}</p>
        </>
      ) : (
        <p>Add a US zipcode to your profile to get weather data!</p>
      )}
    </div>
  );
};

export default WeatherWidget;

