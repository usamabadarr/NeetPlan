import { login } from "../api/authAPI"
import { useState, ChangeEvent, FormEvent } from "react";
import auth from "../utils/auth";


const LoginPage = () => {
    const [loginData, setLoginData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setLoginData({
        ...loginData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      try {
        const {email, password} = loginData
        const data = await login(email, password);
        auth.login(data.token);
      } catch (err) {
        console.error('Failed to login', err);
      }
    };
  
    return (
      <div className='form-container'>
        <form className='form login-form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              value={loginData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              value={loginData.password || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' type='submit'>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  };



export default LoginPage