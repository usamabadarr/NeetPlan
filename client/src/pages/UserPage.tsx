import { updateUser } from "../api/userAPI"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

const UserPage = () => {
  
    const [updateData, setUpdateData] = useState({
      name: '',
      location: '',
    });
  

    useEffect(()=>{
        const user = auth.getProfile()
        setUpdateData({name: user.name, location: user.location})
    },[])

    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setUpdateData({
        ...updateData,
        [name]: value,
      });
    };


    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try {
        const {name, location} = updateData
        const data = await updateUser(name, location);
        auth.login(data.token);
      } catch (err) {
        console.error('Failed to login', err);
      }
    };
  
    return (
      <div className='form-container user-form-container'>
        <form className='form login-form' onSubmit={handleSubmit}>
          <h1>Change user info</h1>
          <div className='form-group'>
            <label>Name</label>
            <input
              className='form-input'
              type='text'
              name='name'
              value={updateData.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Zip Code</label>
            <input
              className='form-input'
              type='text'
              name='location'
              value={updateData.location || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group form-btn-container'>
            <button className='btn btn-primary' type='submit'>
              Update
            </button>
            <Link to='/'><button className='btn btn-primary'>
              Cancel
            </button></Link>
            <Link to='/confirmdelete'><button className='btn btn-primary btn-delete'>
              Delete
            </button></Link>
          </div>
        </form>
      </div>
    );
  };

export default UserPage