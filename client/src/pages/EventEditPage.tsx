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

    const [errormsg, setErrormsg] = useState('')

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
          if (eventUpdate.name === '' || eventUpdate.date === '') {
            setErrormsg('An event name and date are required')
            return
          }
          if (id) {
              await updateEvent(eventUpdate, id);
              window.location.assign('/calendar')
          }
        } catch (err) {
          console.error('Failed to edit event', err);
        }
      };

    const deleteThis = () => {
      if (id) {
      deleteEvent(id)
      window.location.assign('/calendar')
      }
    }

    return (
        <>
            <div className='event-form-container'>
              <form className='form login-form' onSubmit={handleSubmit}>
                <h1>Event details</h1>
                <div className='form-group'>
                  <label>Event Name:</label>
                  <input
                    className='form-input'
                    type='text'
                    name='name'
                    value={eventUpdate.name || ''}
                    onChange={handleChange}
                  />
                  <p className="form-req">*Required.</p>
                </div>
                <div className='form-group'>
                  <label>Date:</label>
                  <input
                    className='form-input'
                    type='text'
                    name='date'
                    value={eventUpdate.date || ''}
                    onChange={handleChange}
                  />
                  <p className="form-req">*Required. Please use mm/dd/yyyy format.</p>
                </div>
                <div className='form-group'>
                  <label>Start Time:</label>
                  <input
                    className='form-input'
                    type='text'
                    name='startTime'
                    value={eventUpdate.startTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>End Time:</label>
                  <input
                    className='form-input'
                    type='text'
                    name='endTime'
                    value={eventUpdate.endTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Notes:</label>
                  <textarea
                    className='form-input'
                    name='notes'
                    value={eventUpdate.notes || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group form-btn-container'>
                  <button className='btn btn-primary' type='submit'>
                    Update
                  </button>
                  <Link to="/calendar"><button className="btn btn-primary">Cancel</button></Link>
                  <button className="btn btn-delete btn-primary" onClick={deleteThis}>Delete</button>
                </div>
                <>
                    {errormsg? (<p className="form-error">{errormsg}</p>): (<></>)}
                </>
              </form>
            </div>
        </>
    )
}

export default EventEditPage