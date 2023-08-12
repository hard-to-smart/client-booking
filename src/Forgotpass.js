import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckSquare, X } from 'react-feather';
import Page from './Layout/Page';
// import { baseurl } from './Api/baseUrl';
import axios from 'axios';

const Forgotpass = () => {
  const [alert, setAlert] = useState(false);
  function displayAlert() {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 7000);
  }

  const [otpResent, setOtpResent] = useState(false);
  const [pin, setPin] = useState('');
  const [otpErr, setOtpErr] = useState('');
  const Useremail = JSON.parse(sessionStorage.getItem('email'));
  const pinInputRef = useRef(null);

  const handlePinChange = (e) => {
    setPin(e.target.value);
    console.log(pin);
  };

  // const resendOtp = async () => {
  //   try {
  //     const { data } = await axios.post(`${baseurl}/api/otpsend`, {
  //       email: Useremail.email,
  //     });
  //     setPin('');
  //     if (data.status === true) {
  //       setOtpResent(true);
  //       sessionStorage.setItem('newOTP', JSON.stringify({ user_otp: data.otp }));
  //       pinInputRef.current.clear();
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const navigate = useNavigate();

  // const verifyOTP = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(JSON.parse(sessionStorage.getItem('email')));
  //     const { data } = await axios.post(`${baseurl}/api/otpverify`, {
  //       email: Useremail.email,
  //       otpnumber: pin,
  //     });
  //     console.log('Response:', data);
  //     sessionStorage.getItem(JSON.stringify({ user_otp: data.otp }));

  //     if (data.status === true) {
  //       navigate('/ResetPass');
  //     } else {
  //       setOtpErr('OTP is incorrect');
  //       pinInputRef.current.clear();
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <Page
      pageContent={
        <>
          <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50">
            <div className="flex flex-col align-middle self-center px-6 py-8 mx-auto items-center justify-center">
              <div className="flex flex-col relative w-full justify-self-center bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <Link to="/">
                  <div className="flex justify-end right-5 top-6 absolute">
                    <X />
                  </div>
                </Link>

                <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot your password?
                </h1>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  Don't worry, Just enter the OTP that we have sent you on your registered email id.
                </p>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" onSubmit={displayAlert}>
                  <div>
                    <label htmlFor="OTP" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Please enter the OTP sent to you
                    </label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1234"
                      required=""
                      onChange={handlePinChange}
                      ref={pinInputRef}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* {otpErr && <p className="text-center text-red-500">{otpErr}</p>} */}

          {/* <div className="text-center py-4 flex gap-1 justify-center">
            <p>Didn't received the OTP?</p>
            <p className="text-center text-[#C31A7F] cursor-pointer" onClick={resendOtp}>
              Resend OTP
            </p>
          </div> */}
          {/* {otpResent && <p className="text-center text-[#C31A7F]">New OTP is Sent</p>} */}

          <div className="flex justify-center py-2">
            {/* <div className="w-[40%]" onClick={verifyOTP}>
              <h2 className="bg-primary-500 cursor-pointer text-center p-3 rounded-lg text-white">Verify OTP</h2>
            </div>*/}
          </div> 
        </>
      }
    />
  );
};

export default Forgotpass;
