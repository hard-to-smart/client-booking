import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom';
import Page from './Layout/Page';
import axios from 'axios';
    
const ResetPass = () => {

    
  
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
        <Page pageContent={(
            <>
    <div className="bg-image ">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                 <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot your password?
                </h1>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  Don't worry, Just enter the OTP that we have sent you on your registered email id.
                </p>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div>
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                
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
                  {otpErr && <p className="text-center text-red-500">{otpErr}</p>}

<div className="text-center py-4 flex gap-1 justify-center">
  <p>Didn't received the OTP?</p>
  {/* <p className="text-center text-[#C31A7F] cursor-pointer" onClick={resendOtp}>
    Resend OTP
  </p> */}
</div>
{/* {/* {otpResent && <p className="text-center text-[#C31A7F]">New OTP is Sent</p>} */}

<div className="flex justify-center py-2">
  {/* <div className="w-[40%]" onClick={verifyOTP}> */}
    <h2 className="bg-primary-500 cursor-pointer text-center p-3 rounded-lg text-white">Verify OTP</h2>
  {/* </div> */}
</div>
                <button type="submit" class="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg--400 dark:hover:bg-primary-500 dark:focus:ring-primary-600">
                    <Link to='/Login'>Reset password</Link></button>
            </form>
        </div>
    </div>
  </div>
  </>
  )}/> 
  )
}

export default ResetPass;