import React from "react";
import CategoryCard from "../PostJob/CategoryCard";

const CandidateHeading = () => {
  return (
    // <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="md:flex justify-between items-center mt-5">
        <h1 className="text-2xl font-semibold text-swift">Add Candidate</h1>
        {/* <div className="space-x-4 md:flex">
          <button className="bg-[#0C1C4D] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
            Save Draft
          </button>
          <button className="border-[1px] border-[#0C1C4D] text-swift px-4 py-2 rounded-md font-semibold hover:bg-[#F4F4F4] transition-colors">
            Save & Continue
          </button>
        </div> */}
      </div>
    // </div>
  );
};

export default CandidateHeading;
