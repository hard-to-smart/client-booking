// Page.js
import React from "react";
import Header from '../Header.js'
import Footer from '../Footer.js'

const Page = ({ pageContent  }) => {
  return (
   
      <div className="flex">
        
        <div className="flex w-full flex-col">
            <div className="header">
        <Header/>     
        </div>
        <div className="bg-[#c4c3d055] "><div className=" h-[88vh] ">{pageContent }</div></div>
        
        <div className="footer">
          <Footer/>
        </div>
        </div>
      </div>
    
  );
};

export default Page;
