import React, { useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useContext } from "react";
import { RiCloseLine, RiShareForwardLine } from "react-icons/ri";
import { BiMessage} from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { authContext } from "../../Auth/AuthProvider.jsx";
import UpdateForm from "../New/UpdateForm";
import SocialLink from "./SocialLink";

// Define the Overview component
const Overview = () => {
  const formData = useLoaderData();
  // console.log('finding error',formData);

  // const appliedJobId = formData._id;

  // console.log("id", appliedJobId);
  const location = useLocation();
  const { user } = useContext(authContext);
  const queryParams = new URLSearchParams(location.search);
  const serializedData = queryParams.get("data");
  // const formData = JSON.parse(decodeURIComponent(serializedData));
  // console.log(formData);
  const jobTitle = formData?.jobTitle;
  const jobPosterEmail = formData?.userEmail;
  const jobId = formData?._id;
  console.log(jobId);
  const [tabIndex, setTabIndex] = useState(0);
  const currentPath = window.location.pathname;
  // console.log(currentPath);
  localStorage.setItem("URL", currentPath);

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const [activeTab, setActiveTab] = useState(0); // Initialize the active tab to 0 (the first tab)

  const handleTabClick = (index) => {
    setActiveTab(index); // Update the active tab when a tab is clicked
  };

  return (
    <div className="">
      {/* <div className="border-[1px] ">
        <div className="border-b-[1px]  bg-gray-100">
        
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Job Preview: {formData?.jobTitle}
          </h1>
        </div>

        <div className="flex justify-between items-center bg-[#F5F5F5] border-b-[1px] shadow-md rounded-md p-4">
          <div className="p-4">
            
            <h1 className="font-bold text-3xl text-blue-900 mb-2">
              {user?.displayName}
            </h1>
            <h1 className="text-xl font-semibold mb-4">{formData?.jobTitle}</h1>
            <div className="flex text-gray-600">
              <h2 className="mr-2">{formData?.jobLocation}</h2>
              <h2 className="text-[#707070]">• {formData?.employmentType}</h2>
            </div>
          </div>
          
          <button
            onClick={openModal}
            className="flex items-center text-blue-900 hover:text-[#004f46]"
          >
            <RiShareForwardLine className="text-2xl mr-1" />
            <span className="font-semibold">Share Jobs</span>
          </button>
        </div>
      </div> */}

      <div className="border bg-[#eef1f1] rounded-sm ">
        <div className=" border-b border-gray-300 py-4">
          <h1 className="text-xl font-semibold text-center text-gray-800">
            Job Preview: {formData?.jobTitle}
          </h1>
        </div>

        <div className="md:flex justify-around items-center border-b border-gray-300 rounded-t-md p-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl uppercase font-bold text-blue-900">
              {user?.displayName}
            </h1>
            <h1 className="text-xl text-gray-500  font-semibold">
              {formData?.jobTitle}
            </h1>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">{formData?.jobLocation}</span>
              <span className="text-[#707070]">
                • {formData?.employmentType}
              </span>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex items-center text-blue-900 hover:text-[#004f46] font-semibold"
          >
            <RiShareForwardLine className="text-2xl mr-1" />
            <span>Share Jobs</span>
          </button>
        </div>
      </div>

      <div className=" my-6 mx-auto max-w-4xl">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <div className="pb-5">
          <TabList className="flex gap-5 justify-center cursor-pointer">
  <Tab
    className={`${
      activeTab === 0
        ? "bg-[#0C1C4D]-700 hover:bg-[#0C1C4D]-600 text-white"
        : "bg-[#0C1C4D]-700 text-gray-100"
    } px-4 py-2 rounded-md transition-colors duration-300 ease-in-out`}
    onClick={() => handleTabClick(0)}
  >
    Overview
  </Tab>
  <Tab
    className={`${
      activeTab === 1
        ? "bg-[#0C1C4D]-700 hover:bg-[#0C1C4D]-600 text-white"
        : "bg-[#0C1C4D]-700 text-gray-700"
    } px-4 py-2 rounded-md transition-colors duration-300 ease-in-out`}
    onClick={() => handleTabClick(1)}
  >
    Application
  </Tab>
</TabList>

          </div>

          <TabPanel>
            <div className="bg-[#ffff]50 border-1 rounded-xl border-gray-800 px-2">
              <div className="overview-content p-4 divide-y-2 leading-7 space-y-5">
                {/* Job description */}
                <div>
                  <h1 className="text-lg text-gray-600 font-bold">
                    Description
                  </h1>
                  <p className="text-gray-700">{formData?.jobDescriptions}</p>
                </div>
                {/* Benefits */}
                <div>
                  <h1 className="text-lg text-gray-600 font-bold">Benefits</h1>
                  <p className="text-gray-700">{formData?.benefits}</p>
                </div>

                <div>
                  {formData && formData.requirements && (
                    <div>
                      {/* Job requirements */}
                      <h3 className="text-lg font-semibold mt-4">
                        Requirements
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {formData.requirements
                          .split(".")
                          .map((requirement, index) => (
                            <li key={index} className="mb-1">
                              {requirement.trim() && `${requirement.trim()}.`}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  {formData && formData.responsibilities && (
                    <div>
                      {/* Job responsibilities */}
                      <h3 className="text-lg font-semibold mt-4">
                        Responsibilities
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {formData.responsibilities
                          .split(".")
                          .map((responsibilityPart, index) => (
                            <li key={index} className="mb-1">
                              {responsibilityPart.trim() &&
                                `${responsibilityPart.trim()}.`}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Additional content */}
                <div>
                  <h3 className="text-lg font-semibold mt-4">Why Join Us?</h3>
                  <p className="text-gray-700">
                    We offer a collaborative work environment, competitive
                    salary, and opportunities for professional growth. Join our
                    team and be a part of our mission to change the industry!
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mt-4">How to Apply</h3>
                  <p className="text-gray-700">
                    Interested candidates should submit their resume and cover
                    letter to careers@example.com. Please include the job title
                    in the subject line of your email.
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {/* <FormNew></FormNew> */}
            <UpdateForm
              jobPosterEmail={jobPosterEmail}
              jobTitle={jobTitle}
              jobId={jobId}
            ></UpdateForm>
          </TabPanel>
        </Tabs>
      </div>
      <div className="space-y-4">
        <div className=" text-center flex gap-7 justify-center  py-2">
          <Link to="/" className="hover:underline text-blue-900 font-semibold">
            View website
          </Link>
          <Link
            to="../dashboard/jobs"
            className="hover:underline text-blue-900 font-semibold"
          >
            View all jobs
          </Link>
          <Link
            to="../dashboard/inbox-email"
            className="hover:underline inline text-blue-900 font-semibold"
          >
         Inbox   <BiMessage size={20} className="inline"/>
          </Link>
        </div>
        <div className="bg-neutral-100 flex gap-7 justify-center text-center py-2">
          <p className="text-gray-700">PoweredBy <span className="font-semibold text-blue-900 underline">JobSwift ATS</span></p>
          <Link
            to="../dashboard/report-center"
            className="hover:underline font-semibold text-gray-700"
          >
            Report
          </Link>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        // <div className="fixed bg-gray-200 inset-0 flex items-center justify-center z-50">
        //   <div className="modal-container bg-white md:w-1/2 lg:3/4 p-4 rounded-lg shadow-lg">
        //     <div className="flex justify-between items-center mb-2">
        //       {/* Modal title */}
        //       <h2 className="text-2xl font-bold">Share this job</h2>
        //       {/* Close modal button */}
        //       <button onClick={closeModal} className="text-gray-500">
        //         <RiCloseLine className="text-lg" />
        //       </button>
        //     </div>
        //     {/* Add your share options/content here */}
        //     <div className="text-gray-700 mt-4">
        //       {/* Modal body */}
        //       <SocialLink />
        //     </div>
        //     <div className="flex justify-center mt-6">
        //       <button
        //         onClick={closeModal}
        //         className="bg-[#d73939] text-white px-4 py-2 rounded-md hover:bg-[#4f0000] focus:outline-none"
        //       >
        //         Quit
        //       </button>
        //     </div>
        //   </div>
        // </div>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black">
        <div className="modal-container bg-white w-full md:w-[400px] p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            {/* Modal title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">Share this job</h2>
            {/* Close modal button */}
            <button onClick={closeModal} className="text-gray-500">
              <RiCloseLine className="text-lg" />
            </button>
          </div>
          {/* Modal body */}
          <div className="text-gray-700">
            <SocialLink />
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 focus:outline-none"
            >
              Quit
            </button>
          </div>
        </div>
      </div>


      )}
    </div>
  );
};

export default Overview;
