import { createEvent} from "../api/eventAPI"
import { useState, ChangeEvent, FormEvent } from "react";
import { EventData } from "../interfaces/EventData";
import { Link, useNavigate } from "react-router-dom";

function EventCreatePage() {

    const navigate = useNavigate()

    const [eventNew, setEventNew] = useState<EventData>({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: ''
        }
    )

    const [errormsg, setErrormsg] = useState('')

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = event.target;
        setEventNew({
          ...eventNew,
          [name]: value,
        });
      };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (eventNew.name === '' || eventNew.date === '') {
              setErrormsg('An event name and date are required')
              return
            }
            await createEvent(eventNew);
            navigate('/all')
        } catch (err) {
          console.error('Failed to create event', err);
        }
      };

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
                    value={eventNew.name || ''}
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
                    value={eventNew.date || ''}
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
                    value={eventNew.startTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>End Time:</label>
                  <input
                    className='form-input'
                    type='text'
                    name='endTime'
                    value={eventNew.endTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Notes:</label>
                  <textarea
                    className='form-input'
                    name='notes'
                    value={eventNew.notes || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group form-btn-container'>
                  <button className='btn btn-primary' type='submit'>
                    Create
                  </button>
                  <Link to="/"><button className="btn btn-primary">Cancel</button></Link>
                </div>
                  <>
                    {errormsg? (<p className="form-error">{errormsg}</p>): (<></>)}
                  </>
              </form>
            </div>
        </>
    )
}

export default EventCreatePage