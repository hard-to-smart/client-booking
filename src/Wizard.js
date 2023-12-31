import React, { useState } from 'react';
import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';
import './Wizard.css';
import Page from './Layout/Page';
import Select from 'react-select';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import status from './Status.js'
const Wizard = () => {
  const navigate= useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async () => {    

    console.log('Sending data:', clientRequirement);

    try {
      const response = await axios.post('http://localhost:8080/api/requirement', clientRequirement);
      console.log('Response:', response.data);
      if (response.data.msg === 'Client requirement submitted successfully') {
        alert('Client requirement submitted successfully');
        navigate('/Status', { state: { email: clientRequirement.email } });
      } else {
        alert('Error saving client requirement. ' + response.data.msg);
      }
    } catch (error) {
      console.error('Error saving client requirement!',error);
      alert('Error submitting client requirement, please try again later');
    }
   
};

  const [clientRequirement, setClientRequriement] = useState({})
  // form 1 data

  const handlePersonalDetails=(e)=>{
    console.log(e.target.name, e.target.value);
    setClientRequriement({
      ...clientRequirement,
      [e.target.name] : e.target.value,
      // ...validateField(e.target.name, e.target.value)
    });
    validateField(e.target.name, e.target.value);
    console.log(clientRequirement);
    
  }
  // Form2 Data
 
  const handleClientRequiement = (e) => {
    console.log(e.target.name, e.target.value);
       // For other input fields, update the clientRequirement state as before
      setClientRequriement({
        ...clientRequirement,
        [e.target.name]: e.target.value,
        // ...validateField(e.target.name, e.target.value)
      });
      validateField(e.target.name, e.target.value);
      console.log(clientRequirement);
      
    }

  // Function to handle changes in the Select component (roomOptions)
  const handleSelectedRoom = (selectedOption) => {
    setClientRequriement({
      ...clientRequirement,
      roomOptions: selectedOption.value,
      
    });
    validateField('roomOptions', selectedOption.value)
    console.log(clientRequirement);
    
  };
  const handleRequiementDesc=(e)=>{
    console.log(e.target.name, e.target.value);
    setClientRequriement({
      ...clientRequirement,
      [e.target.name] : e.target.value,
    });
    console.log(clientRequirement);

  }
  const validateField = (fieldName, value) => {
    const fieldErrors = { ...validationErrors };

    switch (fieldName) {
      case 'company':
        if (!value.trim()) {
          fieldErrors.company = 'Please enter your company\'s name';
        }
        else fieldErrors.company= '';
        break;

      case 'firstName':
        if (!value.trim()) {
          fieldErrors.firstName = 'Please enter your first name';
        } else fieldErrors.firstName='';
        break;

      // Add cases for other fields

      case 'phone':
        if (!validator.isMobilePhone(value, 'en-IN')) {
          fieldErrors.phone = 'Please enter a valid 10-digit phone number';
        } else {
          fieldErrors.phone = '';
        }
        break;

      case 'email':
        if (!value.trim()) {
          fieldErrors.email = 'Please enter the same email address you used to login';
        } else if (!validator.isEmail(value)) {
          fieldErrors.email = 'Please enter a valid email address';
        } else {
          fieldErrors.email = '';
        }
        break;

      case 'designation':
        if (!value.trim()) {
          fieldErrors.designation = 'Please enter your job role/position';
        } else {
          fieldErrors.designation = '';
        }
        break;

      // Add similar cases for other fields

      case 'date':
        if (!value.trim()) {
          fieldErrors.date = 'Please enter a future date excluding Saturdays and Sundays';
        } else {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          if (selectedDate <= currentDate || selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
            fieldErrors.date = 'Please enter a valid future date excluding Saturdays and Sundays';
          } else {
            fieldErrors.date = '';
          }
        }
        break;

      case 'time':
        if (!value.trim()) {
          fieldErrors.time = 'Please enter office hours timing: 9:00 AM - 4:00 PM';
        } else {
          const [hours, minutes] = value.split(':').map(Number);
          if (hours < 9 || hours >= 17) {
            fieldErrors.time = 'Please enter a valid time between 9:00 AM and 5:00 PM';
          } else {
            fieldErrors.time = '';
          }
        }
        break;

        case 'duration':
          if (!value.trim()) {
            fieldErrors.duration = 'Please enter the duration of the meeting';
          } else {
            const duration = parseInt(value, 10);
            if (duration < 1 || duration > 9) {
              fieldErrors.duration = 'The duration must be between 1 and 9 hours';
            } else {
              const selectedTime = parseInt(clientRequirement.time.split(':')[0], 10);
              const selectedMinutes = parseInt(clientRequirement.time.split(':')[1], 10);
              const totalTimeInMinutes = selectedTime * 60 + selectedMinutes + duration * 60;
        
              if (totalTimeInMinutes >= 18 * 60) {
                fieldErrors.duration = 'The meeting duration exceeds the available time';
              } else {
                fieldErrors.duration = '';
              }
            }
          }
          break;

      case 'noOfPeople':
        if (!value.trim()) {
          fieldErrors.noOfPeople = 'Please enter the expected number of people';
        } else {
          const numPeople = parseInt(value, 10);
          if (numPeople <= 0 || numPeople > 250) {
            fieldErrors.noOfPeople = 'The number of people must be between 1 and 250';
          } else {
            fieldErrors.noOfPeople = '';
          }
        }
        break;

      // Add similar cases for other fields

      default:
        break;
    }

    setValidationErrors(fieldErrors);
    return fieldErrors;
  };

  
  // select option commands
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  function handleSelectClick(){
    setIsSelectClicked(!isSelectClicked);
  };
  const customStyles = {
  
    option: (provided, state) => ({
      ...provided,
      backgroundColor:  'white',
      
      color:'black',
      '&:hover': {
        backgroundColor: 'blue',
        color: 'white'
      }
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%', // Set your desired width here
      zIndex:'1'
      
    }),
    control: (provided, state) => ({
      ...provided,
      width: '100%', // Adjust the width to your desired value (e.g., '50%' for half width)
      padding:'4px',
      border: '0px',
      borderBottom: '2px solid #D1D5DB', // Customize the border style here
      backgroundColor: '#fff',
      boxShadow: 'none',
      
    
      
    }),
    placeholder: (provided, state) => ({
      
      position: 'absolute',
      left: '3px',
      fontSize: '14px',
      color: '#7C7C7C',
      transform: state.isFocused ? 'translateY(-20px) scale(0)' : 'translateY(0) scale(1)', // Apply the transform property here
      transition: 'transform 0.2s', // Add transition for smooth animation
      backgroundColor: '#FFFFFF', // Adjust the background color based on focus state
      padding: '4px 4px', // Add padding to adjust the spacing around the placeholder
  }),
   
  };
  
  const roomOptions = [
    { value: "Auditorium", label: "Auditorium" },
    { value: "Conference Room", label: "Conference Room" },
    
  ];

  // select option command ends
 
  return (
    <Page pageContent={(
    <>
    
    <div className="flex flex-col items-center justify-around px-6 py-8 mx-auto md:h-[80vh] lg:py-2 ">
    <div className="flex flex-col max-h-[560px] w-[650px] overflow-y-auto bg-white rounded-lg shadow dark:border mt-0 p-0 dark:bg-gray-800 dark:border-gray-700">

      <FormWizard
        onComplete={handleSubmit} 
       >
        <FormWizard.TabContent title="Personal details"  className='flex '>
          <h1 className='font-[500] text-[18px] dark:text-white'>Personal Details</h1>
          <form id='personalDetails' className='flex flex-col  justify-start text-left text-[18px] ' >
          {/* <div className="grid md:grid-cols-2 md:gap-6"> */}
            <div className="relative z-0 w-full mb-4 group">
                <input type="text" name="company" id="company" value={clientRequirement.company} className="block py-2.5 px-0 w-full bg-slate-100 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  onChange={handlePersonalDetails} required/>
                <label for="company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company </label>
                {validationErrors.company && (
  <span className="text-red-500">{validationErrors.company}</span>
)}
            </div>
            {/* <div className="relative z-0 w-full mb-4 group">
      <input type="text" name="customer_id" id="customer_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handlePersonalDetails} />
      <label for="customer_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Customer ID</label>
  </div> */}
  {/* </div> */}
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-4 group">
        <input type="text" name="firstName" id="firstName" value={clientRequirement.firstName} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handlePersonalDetails} required/>
        <label for="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
   
        {validationErrors.firstName && (
  <span className="text-red-500">{validationErrors.firstName}</span>
)}    
</div>
    <div className="relative z-0 w-full mb-4 group">
        <input type="text" name="lastName" id="lastName" value={clientRequirement.lastName} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handlePersonalDetails} />
        <label for="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
        {validationErrors.lastName && (
  <span className="text-red-500">{validationErrors.lastName}</span>
)}
    </div>
  </div>
    <div className="relative z-0 w-full mb-4 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" value={clientRequirement.phone} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handlePersonalDetails} />
        <label for="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
        {validationErrors.phone && (
  <span className="text-red-500">{validationErrors.phone}</span>
)}
    </div>
    
 
  <div className="relative z-0 w-full mb-4 group">
      <input type="email" name="email" id="email" value={clientRequirement.email} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handlePersonalDetails} />
      <label for="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      {validationErrors.email && (
  <span className="text-red-500">{validationErrors.email}</span>
)}
  </div>
  
  <div className="relative z-0 w-full mb-4 group">
      <input type="text" name="designation" id="designation" value={clientRequirement.designation} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handlePersonalDetails} />
      <label for="designation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Designation</label>
      {validationErrors.designation && (
  <span className="text-red-500">{validationErrors.designation}</span>
)}
  </div>
  
  
</form>

        </FormWizard.TabContent >
        <FormWizard.TabContent title="Additional Info" >
          <h3 className='py-2 font-[500] text-[18px] dark:text-white'>Request Reservation</h3>
          <form id='clientRequirement' className='flex flex-col  justify-start text-left text-[18px] py-6 gap-6'>
          
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-4 group">
    <input type="date" name="date" id="date" value={clientRequirement.date} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleClientRequiement} />

        <label for="date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Preferred Date</label>
        {validationErrors.date && (
  <span className="text-red-500">{validationErrors.date}</span>
)}
    </div>
    <div className="relative z-0 w-full mb-4 group">
        <input type="time" name="time" id="time" value={clientRequirement.time} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleClientRequiement}  />
        <label for="time" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Preferred Time</label>
        {validationErrors.time && (
  <span className="text-red-500">{validationErrors.time}</span>
)}
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-4 group">
    <input type="number" name="noOfPeople" id="noOfPeople" value={clientRequirement.noOfPeople} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleClientRequiement}  />
        <label for="noOfPeople" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expected number of people</label>
        {validationErrors.noOfPeople && (
  <span className="text-red-500">{validationErrors.noOfPeople}</span>
)}
    </div>
    <div className="relative z-0 w-full mb-4 group">
        <input type="number" name="duration" id="duration" value={clientRequirement.duration} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleClientRequiement}  />
        <label for="duration" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expected duration of meeting (hours)</label>
        {validationErrors.duration && (
  <span className="text-red-500">{validationErrors.duration}</span>
)}
    </div>
    </div>
    <div class="relative w-full mb-4 group">
    <Select name='room' options={roomOptions} placeholder={'Meeting room preference'} styles={customStyles} onFocus={handleSelectClick} onChange={handleSelectedRoom}/>
    <label for="room" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${isSelectClicked?'visible':'hidden'}`}></label>
    {validationErrors.roomOptions && (
  <span className="text-red-500">{validationErrors.roomOptions}</span>
)}
   
</div>
        </form>
       
       </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Requirements" className="flex flex-row relative">
          <h2 className='pt-1 font-[500] text-[18px] dark:text-white'>Additional Requirements</h2>
          <p className='dark:text-white'>Mention any other additional requirements</p>
          <form id='requirementDesc' className='py-8' >
          <textarea name="description" id="description" value={clientRequirement.description} wrap='20px' className="h-[200px] block py-10 px-4 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer align-bottom" placeholder="Additional Requirements....." onChange={handleRequiementDesc} />

          </form>
        </FormWizard.TabContent>
      </FormWizard>
      </div>
      </div>
      
    </>
    )}/>
  );
};

export default Wizard;
