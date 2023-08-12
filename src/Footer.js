import React from "react";

const Footer = () => {
  return (
    <div className="flex absolute bottom-0 py-1 w-full bg-[#1e4d6c] text-white justify-around">
      {/* <div className="logo">
        
        <img
          src="http://stpi.in/themes/stpi/images/stpilogo-footer.png"
          alt="stpi"
          title="stpi"
        />
      </div> */}

      <div className="flex  flex-col flex-wrap justify-center text-[12px] text-center items-center align-middle">
        <h3>Headquarters: </h3>
        <p>
          Software Technology Parks of India, 1st Floor, Plate B, Office
          Block-1, East Kidwai Nagar, New Delhi-110023{" "}
        </p>
      </div>

      
        

      {/* <div className="flex flex-row">
        <div className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
          <a
            href="https://www.india.gov.in/"
            title="National Portal of India"
            className="indiaGovPortal"
          >
            <img
              src="http://stpi.in/themes/stpi/images/india.gov-logo.png"
              alt="National Portal of India"
              title="National Portal of India"
            />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
