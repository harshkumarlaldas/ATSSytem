import React from "react";

const HrPlatform = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 md:flex gap-8 justify-between items-center mt-8 md:mt-16">
        <div className="w-full md:w-1/2">
          <img
            src="https://i.ibb.co/Bg7bL6z/hrdone.png"
            alt="HR Image"
            className="w-full md:max-w-md mx-auto rounded-lg"
          />
        </div>
        <div className="w-full space-y-6 mt-6 md:mt-0 md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-500 md:text-3xl">
            Elevate Your Hiring Process with RapidHire
          </h2>
          <p className="text-lg text-gray-700 leading-7">
            RapidHire is your all-in-one ATS solution designed to streamline
            the hiring process. Discover the perfect candidates faster with our
            cutting-edge features, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Effortless Job Posting and Management</li>
            <li>Advanced Resume Screening</li>
            <li>Seamless Interview Scheduling</li>
            <li>Integrated Collaboration Tools</li>
            <li>Real-time Candidate Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HrPlatform;

