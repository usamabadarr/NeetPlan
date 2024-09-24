import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { EventData } from "../interfaces/EventData"
import { getAllEvents } from "../api/eventAPI"

function AllEventPage() {

    const [events, setEvents] = useState<EventData[]>([])


    const fetchEvents = async () => {
        const array = await getAllEvents()
        if (array) {
        setEvents(array)}

    }

    useEffect(()=>{{
        fetchEvents()
    }}, []
    )


    return (
        <>
          {(events.length < 1)? 
            <p className="error-p">You have no saved events.</p>
            : (<div className="table-container">
                <table className="table">
                  <thead><tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Notes</th>
                      <th>Edit</th>
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
              </div>)}
        </>
    )
}


export default AllEventPage