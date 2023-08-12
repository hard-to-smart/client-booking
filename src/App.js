import React from 'react';
import Login from './Login';
import Forgotpass from './Forgotpass';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Wizard from './Wizard';
import ResetPass from './ResetPass';
import Status from './Status';
import Page from './Layout/Page';
const App = () => {
  return (
      
      
        <Routes>
          <Route exact path='/Status' element={<Status/>}></Route>
          <Route exact path="/" element={<Login/>}> </Route>
          <Route exact path="/Signup" element={<Signup/>}> </Route>
          <Route exact path="/Forgotpass" element={<Forgotpass/>}> </Route>
          <Route exact path="/Wizard" element={<Wizard/>}> </Route>
          <Route exact path="/ResetPass" element={<ResetPass/>}> </Route>
          <Route exact path="Page" element={<Page/>}> </Route>
        </Routes>
         
    
  )
}

export default App;



