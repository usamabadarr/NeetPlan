import { useParams, Link } from "react-router-dom"
import { useState, useEffect, ChangeEvent, FormEvent } from "react"

import { getSingleEvent, deleteEvent, updateEvent } from "../api/eventAPI"
import { EventData } from "../interfaces/EventData"


function EventEditPage() {

    const {id} = useParams()

    const [eventUpdate, setEventUpdate] = useState<EventData>({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: ''
        }
    )

    const fetchEvent = async() => {
        if (id) {
        const data: EventData = await getSingleEvent(id)
        setEventUpdate(data)
        }
    }

    useEffect(() => {fetchEvent()
    },[])

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
        setEventUpdate({
          ...eventUpdate,
          [name]: value,
        });
      };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (id) {
                const data = await updateEvent(eventUpdate, id);
                return data
            }
        } catch (err) {
          console.error('Failed to edit event', err);
        }
      };

    const deleteThis = () => {
      if (id) {
      deleteEvent(id)
      window.location.assign('/all')
      }
    }

    return (
        <>
            <div className='form-container'>
              <form className='form login-form' onSubmit={handleSubmit}>
                <h1>Event details</h1>
                <div className='form-group'>
                  <label>Event Name</label>
                  <input
                    className='form-input'
                    type='text'
                    name='name'
                    value={eventUpdate.name || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Date</label>
                  <p>*Please use m/d/yyyy format!</p>
                  <input
                    className='form-input'
                    type='text'
                    name='date'
                    value={eventUpdate.date || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Start Time</label>
                  <input
                    className='form-input'
                    type='text'
                    name='startTime'
                    value={eventUpdate.startTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>End Time</label>
                  <input
                    className='form-input'
                    type='text'
                    name='endTime'
                    value={eventUpdate.endTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Notes</label>
                  <textarea
                    className='form-input'
                    name='notes'
                    value={eventUpdate.notes || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <button className='btn btn-primary' type='submit'>
                    Update
                  </button>
                </div>
              </form>
              <div>
                <button className="btn"><Link to="/all">Cancel</Link></button>
                <button className="btn btn-delete" onClick={deleteThis}>Delete</button>
              </div>
            </div>
        </>
    )
}

export default EventEditPage