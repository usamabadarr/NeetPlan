import React from 'react';

type Reminder = {
  id: number;
  taskId: number;
  reminderTime: string; 
};

type RemindersProps = {
  reminders: Reminder[];
};

const Reminders: React.FC<RemindersProps> = ({ reminders }) => {
  return (
    <div className="reminders">
      <h3>Upcoming Reminders</h3>
      <ul>
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <li key={reminder.id}>
              Task ID: {reminder.taskId} - Reminder Time: {new Date(reminder.reminderTime).toLocaleString()}
            </li>
          ))
        ) : (
          <li>No reminders available</li>
        )}
      </ul>
    </div>
  );
};

export default Reminders;

