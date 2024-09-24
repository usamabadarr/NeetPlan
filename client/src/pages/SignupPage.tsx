import { signUp, getUsers } from "../api/authAPI"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import auth from "../utils/auth";
import { Link } from "react-router-dom";
import { UserData } from "../interfaces/UserData";

const SignupPage = () => {
    const [signupData, setSignupData] = useState({
      email: '',
      password: '',
      name: '',
      location: ''
    });
  
    const [errormsg, setErrormsg] = useState('')

    const [users, setUsers] = useState<UserData[]>([])

    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = event.target;
      setSignupData({
        ...signupData,
        [name]: value,
      });
    };

    const fetchUsers = async () => {
      const array = await getUsers()
      setUsers(array)
    }

    useEffect(()=> {fetchUsers()},[])

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      console.log(users)
      if (signupData.email === '' || signupData.password === '') {
        setErrormsg('An email and password are required')
        return
      }
      else if (users.length>0 && users.findIndex((element) => (element?.email === signupData.email)) !== -1) {
        setErrormsg('This email is already signed up')
        return
      }
      else if (signupData.password.length < 8 || signupData.password.length > 20) {
        setErrormsg('Passwords should be between 8 and 20 characters')
        return
      }
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
            <label>Email:</label>
            <input
              className='form-input'
              type='email'
              name='email'
              value={signupData.email || ''}
              onChange={handleChange}
            />
            <p className="form-req">*Required</p>
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              className='form-input'
              type='password'
              name='password'
              value={signupData.password || ''}
              onChange={handleChange}
            />
            <p className="form-req">*Required</p>            
          </div>
          <div className='form-group'>
            <label>Name:</label>
            <input
              className='form-input'
              type='text'
              name='name'
              value={signupData.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Zip Code:</label>
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
              <Link to="/">Back</Link>
            </button>
            <>
              {errormsg? (<p className="form-error">{errormsg}</p>): (<></>)}
            </>
            &nbsp;
            <button className='btn btn-primary' type='submit'>
              Signup
            </button>
          </div>
        </form>
        <button className='btn btn-primary' type='submit'>
              <Link to="/">Back</Link>
        </button>
      </div>
    );
  };
export default SignupPage