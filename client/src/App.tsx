import React, { useState, useEffect } from 'react';

import './Index.css';


import UserProfile from './Components/UserProfile';
import TaskList from './Components/TaskList';
import WeatherWidget from './Components/WeatherWidget';
import Reminders from './Components/Reminders';

function App() {
  // Storing User Data
  const [user, setUser] = useState({
    username: 'JohnDoe',
    location: 'Plano, TX',
    profilePicture: 'https://via.placeholder.com/150',
  });

  // Storing Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Exercise', completed: false, priority: 'high' },
    { id: 2, title: 'Project Meeting', completed: false, priority: 'medium' },
    { id: 3, title: 'Code Review', completed: true, priority: 'low' },
  ]);

  // Storing Weather Data
  const [weather, setWeather] = useState({
    temperature: '72°F',
    description: 'Partly Cloudy',
  });

  // Storing Reminders
  const [reminders, setReminders] = useState([
    { id: 1, taskId: 1, reminderTime: '2024-09-16T08:00:00Z' },
  ]);

  // Fetching Weather Data Based on User's Location
  useEffect(() => {
    // Fetching Weather for Location
    console.log(`Fetching weather for location: ${user.location}`);
    setTimeout(() => {
      setWeather({ temperature: '75°F', description: 'Sunny' });
    }, 2000);
  }, [user.location]);

  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>Daily Tracker</h1>
        <nav>
          <ul>
            <li><a href="#tasks">Tasks</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#reminders">Reminders</a></li>
            <li><a href="#weather">Weather</a></li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main>
        {/* User Profile Section */}
        <section id="profile">
          <h2>User Profile</h2>
          <UserProfile user={user} />
        </section>

        {/* Task List Section */}
        <section id="tasks">
          <h2>Your Daily Tasks</h2>
          <TaskList tasks={tasks} />
        </section>

        {/* Reminders Section */}
        <section id="reminders">
          <h2>Reminders</h2>
          <Reminders reminders={reminders} />
        </section>

        {/* Weather Widget Section */}
        <section id="weather">
          <h2>Current Weather</h2>
          <WeatherWidget weather={weather} />
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

