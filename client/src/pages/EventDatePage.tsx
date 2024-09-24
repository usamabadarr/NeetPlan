import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { EventData } from "../interfaces/EventData"
import { getDayEvents } from "../api/eventAPI"

function EventDatePage() {

    const {id} = useParams()

    const [events, setEvents] = useState<EventData[]>([])


    const fetchEvents = async (date: string) => {
        const array = await getDayEvents(date)
        if (array) {
        setEvents(array)}

    }

    useEffect(()=>{if (id) {
        fetchEvents(id)
    }}, []
    )


    return (
        <>
          {(events.length < 1)? 
            <p className="error-p">There are saved events for this day.</p>
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


export default EventDatePage