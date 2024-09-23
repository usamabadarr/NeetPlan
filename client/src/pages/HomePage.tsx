import { useState, useEffect } from 'react';

import fetchWeather from '../api/weatherAPI';
import UserProfile from '../components/UserProfile';
import TaskList from '../components/TaskList';
import WeatherWidget from '../components/WeatherWidget';
// import Reminders from '../components/Reminders';
import auth from '../utils/auth';

function App() {
  // // Storing User Data
  const [user, setUser] = useState('');

  useEffect(()=>{
    const user = auth.getProfile()
    setUser(user.name)
  },[])

  // // Storing Tasks
  // const [tasks, setTasks] = useState([
  //   { id: 1, title: 'Morning Exercise', completed: false, priority: 'high' },
  //   { id: 2, title: 'Project Meeting', completed: false, priority: 'medium' },
  //   { id: 3, title: 'Code Review', completed: true, priority: 'low' },
  // ]);

  // Storing Weather Data
  const [weather, setWeather] = useState({
    temp: '',
    weather: '',
    location: ''
  });

  // // Storing Reminders
  // const [reminders, setReminders] = useState([
  //   { id: 1, taskId: 1, reminderTime: '2024-09-16T08:00:00Z' },
  // ]);


  const getWeather = async() => {
    const weatherData = await fetchWeather();
    if (weatherData.temp && weatherData.weather && weatherData.location) {
      setWeather({temp: weatherData.temp, weather: weatherData.weather, location: weatherData.location})
    }
  }

  // Fetching Weather Data Based on User's Location
  useEffect(() => {getWeather()
  }, []);

  return (
    <div className="App">
      <main>
        {/* User Profile Section */}
        <section id="profile">
          <h2>User Profile</h2>
          <UserProfile user={user} />
        </section>

        <section id="weather">
          <h2>Weather</h2>
          <WeatherWidget weather={weather} />
        </section>

        {/* Task List Section */}
        <section id="tasks">
          <h2>Today's Events</h2>
          <TaskList/>
        </section>

        {/* Reminders Section */}
        {/* <section id="reminders">
          <h2>Reminders</h2>
          {reminders.length > 0 ? (
            <Reminders reminders={reminders} />
          ) : (
            <p>No reminders set</p>
          )}
        </section> */}

        {/* Weather Widget Section */}
        {/* <section id="weather">
          <h2>Current Weather</h2>
          <WeatherWidget weather={weather} />
        </section> */}
      </main>
    </div>
  );
}

export default App
