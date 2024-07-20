import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CandidateTables from "../../../Components/Dashboard/Candidate/CandidateTables";
import ScanNewCandidate from "../../../Components/Dashboard/Candidate/ScanNewCandidate";
import { getAllCandidates } from "../../../redux/candidates/candidatesOperation";
import { authContext } from "../../../Auth/AuthProvider";
import LoaderInternal from "../../../Components/LoaderInternal/LoaderInternal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import { CreateCandidate } from "./CreateCandidate";

const Candidates = () => {
  const dispatch = useDispatch();
  const [isAddCandidateOpen, setAddCandidateOpen] = useState(false);
  const { candidates, isLoading, error } = useSelector(
    (state) => state.candidates
  );
  const { user } = useContext(authContext);
  const email = user?.email;

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const candidatesToShow = candidates.slice(startIndex, endIndex);

  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <LoaderInternal></LoaderInternal>;
  }

  const openAddCandidate = () => {
    setAddCandidateOpen(true)
  }

  const handleAddCandidateClose = () => {
    setAddCandidateOpen(false)
  }

  return (
    <div className="bg-gray-50">
      <div className="pt-24 md:w-12/12" style={{ marginLeft: '1450px' }}>
        <button className="bg-[#0C1C4D] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors" onClick={openAddCandidate}>
          Add Candidate
        </button>
        {/* <ScanNewCandidate /> */}
      </div>
      <div className="md:flex container mx-auto justify-between items-start gap-6 w-full">
        <div className="md:w-12/12 mb-2">
          <div className="pt-4">
            {/* <CandidateTables candidatesData={candidatesToShow} /> */}
            <CandidateTables candidatesData={candidatesToShow} />
            {/* Pagination */}
            <div className="" style={{ float: 'right' }}>
              <div className="flex gap-2 items-center mt-4">
                <button
                  className={`bg-blue-100 py-0 px-6 border-10 rounded-sm ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  &#8592;
                </button>
                <button
                  className={`bg-blue-100 py-0 px-6  rounded-sm  ${currentPage >= totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddCandidateOpen && <CreateCandidate
        open={isAddCandidateOpen}
        handleClose={handleAddCandidateClose}
      />}
    </div>
  );
};

export default Candidates;
