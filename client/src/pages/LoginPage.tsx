import { login } from "../api/authAPI"
import { useState, ChangeEvent, FormEvent } from "react";
import auth from "../utils/auth";
import { Link } from "react-router-dom";


const LoginPage = () => {
    const [loginData, setLoginData] = useState({
      email: '',
      password: '',
    });
  
    const [errormsg, setErrormsg] = useState('')

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
        setErrormsg('Authentication failed')
      }
    };
  
    return (
      <div className='form-container login-form-container'>
        <form className='form login-form' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='form-group'>
            <label>Email:</label>
            <input
              className='form-input'
              type='email'
              name='email'
              value={loginData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              className='form-input'
              type='password'
              name='password'
              value={loginData.password || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group form-btn-container'>
            <button className='btn btn-primary loginButton' type='submit'>
              <Link to="/">Back</Link>
            </button>
            &nbsp;
            <button className='btn btn-primary loginButton' type='submit'>
              Login
            </button>
            <>
              {errormsg? (<p className="form-error">{errormsg}</p>): (<></>)}
            </>
          </div>
        </form>
      </div>
    );
  };



export default LoginPage