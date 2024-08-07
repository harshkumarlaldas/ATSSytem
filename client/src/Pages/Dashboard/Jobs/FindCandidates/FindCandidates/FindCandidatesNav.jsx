import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FindCandidatesNav = ({id}) => {
  const [activeTab, setActiveTab] = useState("jobDetails");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (

    <div className="w-full ">
      <div className="bg-white fixed md:top-[68px] top-[62px] border-[1px] border-gray-300 shadow w-full mx-auto px-4 py-2">
      <div className="flex justify-between items-center w-full mt-2">
        <h2 className="lg:md:text-3xl font-semibold text-gray-600">Web Developer</h2>
        <div className="lg:md:space-x-4 space-x-2 flex items-center">
          {/* Dropdown for View Candidates */}

          <Link to={"../candidate"}>
            {" "}
            <button className=" lg:md:text-lg text-[10px] bg-orange-500 text-white p-1 lg:md:px-4  rounded-full hover:bg-orange-700 transition duration-300 ease-in-out">
              View Candidates
            </button>
          </Link>

          <Link
            to="../jobs"
            className="lg:md:text-lg text-[10px] bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-1 px-4 rounded-full transition duration-300 ease-in-out"
          >
            View Jobs
          </Link>

          {/* Dropdown for Published (Career Page Only) */}

          <button className="lg:md:text-lg text-[10px] bg-red-600 text-white py-1 px-4 rounded-full hover:bg-red-700 transition duration-300 ease-in-out">
            Publish
          </button>
        </div>
      </div>

      <div className="flex justify-evenly text-gray-500  gap-4 w-full pt-8">
        <Link
          to={`jobDetails/${id}`}
          className="tab-link"
          onClick={() => handleTabClick("jobDetails")}
          style={
            activeTab === "jobDetails"
              ? {
                  borderBottom: "2px solid #33879f",
                  fontWeight: "bold",
                  color: "#33879f",
                }
              : {}
          }
        >
          Job Details
        </Link>
        <Link
          to="candidates"
          className="tab-link"
          onClick={() => handleTabClick("candidates")}
          style={
            activeTab === "candidates"
              ? {
                  borderBottom: "2px solid #33879f",
                  fontWeight: "bold",
                  color: "#33879f",
                }
              : {}
          }
        >
          Find Candidates
        </Link>
        <Link
          to="teamMembers"
          className="tab-link"
          onClick={() => handleTabClick("teamMembers")}
          style={
            activeTab === "teamMembers"
              ? {
                  borderBottom: "2px solid #33879f",
                  fontWeight: "bold",
                  color: "#33879f",
                }
              : {}
          }
        >
          Team Members
        </Link>
        <Link
          to="workflow"
          className="tab-link"
          onClick={() => handleTabClick("workflow")}
          style={
            activeTab === "workflow"
              ? {
                  borderBottom: "2px solid #33879f",
                  fontWeight: "bold",
                  color: "#33879f",
                }
              : {}
          }
        >
          Workflow
        </Link>
      </div>
    </div>
    </div>
  );
};

export default FindCandidatesNav;
