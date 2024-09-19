import { createEvent} from "../api/eventAPI"
import { useState, ChangeEvent, FormEvent } from "react";
import { EventData } from "../interfaces/EventData";

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
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
            const data = await createEvent(eventNew);
            return data
        } catch (err) {
          console.error('Failed to create event', err);
        }
      };

      const ReturnHome = () => {
        window.location.assign('/event')
      }

    return (
        <>
            <div className='form-container'>
              <form className='form login-form' onSubmit={handleSubmit}>
                <h1>Event details</h1>
                <div className='form-group'>
                  <label>Name</label>
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
                  <input
                    className='form-input'
                    type='text'
                    name='notes'
                    value={eventNew.notes || ''}
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
                <button className="btn" onClick={ReturnHome}>Cancel</button>
              </div>
            </div>
        </>
    )
}

export default EventCreatePage