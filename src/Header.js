import React, { useState, useRef, useEffect } from 'react';
import Logo from './images/logo.png';
import  { FaBell, FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [language, setLanguage] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [logOut,setLogOut] = useState(false);
  const toggleLogOut=() => {
    setLogOut(!logOut);
  }
  const logoutDivRef = useRef(null);
  const logoutMenuRef =useRef(null);
  const handleClickOutsideDropdown = (event) => {
    if (isDropdownOpen && logoutMenuRef.current && !logoutMenuRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown, true);
    };
  }, [isDropdownOpen]);
  const handleClickOutsideLogout = (event) => {
    if (logOut && logoutDivRef.current && !logoutDivRef.current.contains(event.target)) {
      setLogOut(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideLogout, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideLogout, true);
    };
  }, [logOut]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/logout');
      // Handle successful logout
      console.log(response.data.message);
      window.location.href='/';
      // You can perform additional actions here, such as redirecting the user or updating the UI
    } catch (error) {
      // Handle error
      console.error('Error logging out:', error.response.data.error);
    }

    // Close the logout div
    toggleLogOut();
  };


  // page language translation
  const handleLanguageToggle = () => {
    const targetLanguage = language === 'en' ? 'hi' : 'en';
    translatePageContent(targetLanguage); // Move this line inside the handleLanguageToggle function
    setLanguage(targetLanguage); // Move this line inside the handleLanguageToggle function
  };

  const translatePageContent = (targetLanguage) => {
    // Get the translation file for the target language (e.g., translations_hi.json for Hindi)
    fetch(`/path/to/translations_${targetLanguage}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((translations) => {
        // Update the content of the current page with the translated content
        // For example, you can use DOM manipulation to update the text of specific elements
        document.getElementById('page-title').innerText = translations['page-title'];
        document.getElementById('section-1-content').innerText = translations['section-1-content'];
        // Update other content as needed
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
      });
  };

  return (
    <header className="flex items-center justify-between  px-8 bg-[#1e4d6c] text-white">
      <div className="flex items-center">
        <a href='https://stpi.in/en'><img src={Logo} alt="Company Logo" className="mr-4" /></a>
      </div>

      <div className="flex items-center gap-3 cursor-pointer">
{/* 
        <div>
          <button onClick={handleLanguageToggle} className="bg-slate-100 text-[#1e4d6c] text-[14px] font-bold rounded-[50%] px-2 py-1">
            {language === 'en' ? 'En' : 'Hi'}
          </button>
        </div> */}
        <div>
         <Link to='/Status'> <FaBell size={26}/></Link>
        </div>
        <div onClick={handleToggleDropdown} className='relative flex flex-col'>
        <FaRegUserCircle size={28}/>

        </div>
        {isDropdownOpen && (
        <div ref={logoutMenuRef} className="flex flex-col absolute top-14 right-4 p-2 text-gray-800 font-semibold hover:bg-blue-200 bg-gray-100 cursor-pointer rounded-[10px] shadow-xl" style={{textDecorationLine:"none"}} onClick={toggleLogOut}>Logout</div>
        )}
      </div>
      {logOut && (
                    <div className='fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50  z-50'>

                     <div ref={logoutDivRef} className='bg-white flex flex-col items-center gap-3 px-10 py-4 justify-center rounded-[20px] p-4'> 
                     <p className='font-[500] text-[14px] text-slate-700 dark:text-slate-300 '>Remember: The changes that you made if not finished might get lost !</p>

                      <p className='font-[600] text-slate-900 dark:text-slate-100 '>Are you sure you want to log out? </p>
                      <button class="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[20px] text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLogout}>Log Out</button>          
      <button className='border-[2px] focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-[20px] text-sm px-5 py-2.5 text-center border-primary-700 text-primary-700  cursor-pointer ' onClick={toggleLogOut}>Cancel</button>

                      </div>
                  </div>

                )}
      
    </header>
    
  );
};

export default Header;
