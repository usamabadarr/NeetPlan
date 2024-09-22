import { createEvent} from "../api/eventAPI"
import { useState, ChangeEvent, FormEvent } from "react";
import { EventData } from "../interfaces/EventData";
import { Link } from "react-router-dom";

function EventCreatePage() {

    const [eventNew, setEventNew] = useState<EventData>({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: ''
        }
    )

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
            console.log(eventNew)
            await createEvent(eventNew);
            window.location.assign('/calendar')
        } catch (err) {
          console.error('Failed to create event', err);
        }
      };

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
                    value={eventNew.name || ''}
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
                    value={eventNew.date || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Start Time</label>
                  <input
                    className='form-input'
                    type='text'
                    name='startTime'
                    value={eventNew.startTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>End Time</label>
                  <input
                    className='form-input'
                    type='text'
                    name='endTime'
                    value={eventNew.endTime || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Notes</label>
                  <textarea
                    className='form-input'
                    name='notes'
                    value={eventNew.notes || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-group'>
                  <button className='btn btn-primary' type='submit'>
                    Create
                  </button>
                </div>
              </form>
              <div>
                <button className="btn"><Link to="/all">Cancel</Link></button>
              </div>
            </div>
        </>
    )
}

export default EventCreatePage