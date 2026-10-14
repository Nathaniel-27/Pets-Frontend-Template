import {useState, useEffect, useRef, useContext} from 'react'
import MainLayout from './MainLayout'
import { useDocTitle } from '../customHooks'
import {login, logout} from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {

  const {currentUser, setCurrentUser} = useContext(UserContext);

  const [doctitle, setDocTitle] = useDocTitle("Log In");
  const navigate = useNavigate();
  
  // NOTE: In Web 3 2026 we did NOT have time to to go over useRef
  const emailRef = useRef(); 
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    emailRef.current.focus();
    setCurrentUser(null); // delete the currentUser on first render
    logout(); // this will delete the token from session storage
  }, [])
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(validate(email, password)){
      try{
        const user = await login(email, password);
        setCurrentUser(user);
        navigate("/");
      }catch(err){
        setErrors({invalidLogin: err.message});
      }
    }
  }

  const validate = (email, password) => {
    
    let isValid = true;
    setErrors({});
    
    if(email === ""){
      setErrors(prev => ({...prev, email:"Email is required"}))
      isValid = false;
    }
    
    if(password === ""){
      setErrors(prev => ({...prev, password:"Password is required"}))
      isValid = false;
    }

    return isValid;
  }

  return (
    <MainLayout>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        {errors.invalidLogin && <span className='validation'>{errors.invalidLogin}</span>}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" ref={emailRef} />
          {errors.email && <span className='validation'>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" ref={passwordRef} />
          {errors.password && <span className='validation'>{errors.password}</span>}
        </div>
        <button>Login</button>
      </form>
    </MainLayout>
  )
}

export default LoginPage
