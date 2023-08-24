import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Page from './Layout/Page';
import axios from 'axios';
const Login = () => {
    const [loginDetails, setLoginDetails] = useState({});
    const [loginError , setLoginError] = useState('');
    const handleLoginChange=(e)=>{
        setLoginDetails({
        ...loginDetails,
        [e.target.name]:e.target.value,
    })
    console.log(loginDetails);
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8080/api/login', loginDetails);
    
          if (response.data.msg === 'Login successful.') {
            alert('Login successful!');
            window.location.href = '/Wizard'; // Redirect to the dashboard or desired page
          } else {
            setLoginError('Invalid email or password.');
          }
        } catch (error) {
          console.error('Login failed!', error.response.data.error);
          setLoginError(error.response.data.error);
        }
      };

    return(
        <Page pageContent={(

  <>  
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleLoginChange}/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleLoginChange}/>
                  </div>
                  {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                  <div className="flex items-center justify-between">
                      {/* <div className="flex items-start">
                           <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div> 
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div> */}
                      <Link to='/Forgotpass' className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLoginSubmit}>Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to='/Signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>

</>
        )}/>
);
};

export default Login;
