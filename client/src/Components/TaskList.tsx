import { useState, useEffect } from 'react';
import { EventData } from '../interfaces/EventData';
import { getDayEvents } from '../api/eventAPI';
import { Link } from 'react-router-dom';

function TodayEvents() {


  const [events, setEvents] = useState<EventData[]>([])


  const fetchEvents = async (date: string) => {
      const array = await getDayEvents(date)
      if (array) {
      setEvents(array)}

  }

  useEffect(()=>{
      const id = (new Date(Date.now())).toLocaleDateString().split('/').join('-')
      fetchEvents(id)
  }, []
  )


  return (
      <>
        {(events.length < 1)? 
          <p className="error-p">You have nothing scheduled for today</p>
          : (<>
              <p>Here's what you've got planned today</p>
              <table className="table">
                <thead><tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                {events.map((event) =>(
                  <tr key={event.id}>
                    <td><p>{event.name}</p></td>
                    <td>{event.date}</td>
                    <td>{event.startTime}</td>
                    <td>{event.endTime}</td>
                    <td>{event.notes}</td>
                    <td><Link to={`/event-edit/${event.id}`}><button>Edit Event</button></Link></td>
                  </tr>
                ))}
                </tbody>
              </table>
            </>)}
      </>
  )
}


export default TodayEvents
