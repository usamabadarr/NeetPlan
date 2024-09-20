import { signUp } from "../api/authAPI"
import { useState, ChangeEvent, FormEvent } from "react";
import auth from "../utils/auth";

const SignupPage = () => {
    const [signupData, setSignupData] = useState({
      email: '',
      password: '',
      name: '',
      location: ''
    });
  
    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setSignupData({
        ...signupData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try {
        const data = await signUp(signupData);
        auth.login(data.token);
      } catch (err) {
        console.error('Failed to sign up', err);
      }
    };
  
    return (
      <div className='form-container'>
        <form className='form login-form' onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              value={signupData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              value={signupData.password || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Name</label>
            <p className='optional'> *optional</p>
            <input
              className='form-input'
              type='text'
              name='name'
              value={signupData.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Location</label>
            <p className='optional'> *optional</p>
            <input
              className='form-input'
              type='text'
              name='location'
              value={signupData.location || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' type='submit'>
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  };
export default SignupPage