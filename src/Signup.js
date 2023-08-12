import React, {useState} from 'react'
import { Link, json } from 'react-router-dom'
import Page from './Layout/Page'
import axios from 'axios';

const Signup = () => {

    // Create an object with the user data    
   
    const [email, setEmail] = useState('');
    const[password, setPassword ] =useState('');
    const[confirmPassword, setConfirmPassword] =useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    // const [signupError, setSignupError] = useState(''); // Add this state for signup error message

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
      };
    
      const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
      };
      // const validationsPass = email && password && password === confirmPassword;

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          setEmailError('Please enter a valid email address.');
          return;
        } else if (password !== confirmPassword) {
          setPasswordError('Passwords do not match.');
          return;
        } else if (email && password && password === confirmPassword) {
          try {
            const response = await axios.post("http://localhost:8080/api/signup", { email, password });
            console.log('Signup successful', response.data.msg);
      
            localStorage.setItem('userValue', JSON.stringify({ email, password }));
            alert('Your account has been created successfully!');
            window.location.href = '/';
          } catch (error) {
            console.error('Signup failed!', error.response.data.error);
            console.log(error);
            alert(error.response.data.error); // Display the signup error as an alert
          }
        }
      };
      
  return (

    <Page pageContent={(
      <>
      <div className="flex h-full items-center justify-center px-6 pt-4 mx-auto ">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create and account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                      <div>
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="text" name="email" id="email" onChange={handleEmailChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                      </div>
                      <div>
                          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" onChange={handlePasswordChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div>
                          <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="password" name="confirm-password" id="confirm-password" onChange={handleConfirmPasswordChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                      </div>
                      
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
           
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <Link to='/' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </>)}/>
  )
}

export default Signup