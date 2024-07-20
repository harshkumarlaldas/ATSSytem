import React from "react";

function Design(){
    return (
      <>
        {/* <h1 className="font-bold text-center">Design</h1> */}
        <div className="min-h-screen">
        <div className="max-w-3xl mx-auto p-8">
          <h1 className="text-3xl  mb-4 text-center p-4">Design Services to Elevate Your RapidHire Experience</h1>
         <div className='overflow-auto  h-2/3 mb-5'> 
          <h2 className="text-xl font-semibold mb-2">1. Graphic Design</h2>
          <p className="mb-4">
           Offer custom graphic design services to create visually appealing job listings, company profiles, and promotional materials that attract top talent and showcase employer branding
          </p>
  
          <h2 className="text-xl font-semibold mb-2">2. User Interface (UI) Design:</h2>
          <p className="mb-4">
           Provide UI design expertise to optimize the platform's interface for intuitive navigation, seamless user experience, and maximum engagement.
          </p>
  
          <h2 className="text-xl font-semibold mb-2">3.Branding and Identity: </h2>
          <p className="mb-4">
          Develop compelling brand identities for companies, including logos, color palettes, typography, and brand guidelines, to strengthen their employer branding and attract candidates who resonate with their values.
          </p>
  
          <h2 className="text-xl font-semibold mb-2">4.Responsive Web Design: </h2>
          <p className="mb-4">
          Ensure that the RapidHire platform is fully responsive and accessible across all devices by implementing responsive web design principles and techniques.
          </p>
  
          {/* Add more sections as needed */}
          </div>
        </div>
      </div>
      </>
    );
  }

  export default Design;