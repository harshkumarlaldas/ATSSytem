import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { HiChat, HiHand, HiInformationCircle, HiMail } from "react-icons/hi";
import { getAllCandidates } from "../../../redux/candidates/candidatesOperation";
import { authContext } from "../../../Auth/AuthProvider.jsx";
import candidateImage from "./../../../assets/Image/user.png";
import { RAPIDHIRE_ENDPOINT } from "../../../constants.js";

const CandidateTables = ({ candidatesData }) => {
  const [candidates, setCandidates] = useState([]);
  const { user } = useContext(authContext);

  useEffect(() => {
    const api = RAPIDHIRE_ENDPOINT + `/all-candidate/${user?.email}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCandidates(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleUnSelectAll = () => {
    setIsChecked([]);
    const checkboxes = document.querySelectorAll(".form-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  async function handleDelete(candidateId) {
    try {
      const response = await fetch(
        RAPIDHIRE_ENDPOINT + `/delete-candidate/${candidateId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const remaining = candidates.filter(
          (candidate) => candidate._id !== candidateId
        );
        setCandidates(remaining);
        dispatch(getAllCandidates(user?.email));
        toast.success("Candidate deleted successfully", {
          position: "bottom-center",
        });
      } else {
        console.error("Failed to delete candidate. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while deleting the candidate:", error);
    }
  }

  const openModal = (candidateId) => {
    // setSelectedCandidateId(candidateId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // setSelectedCandidateId("");
    setIsModalOpen(false);
  };

  const openMessageModal = (candidateId) => {
    // setSelectedCandidateId(candidateId);
    setMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  const onSubmit = (data) => {
    const mailData = {
      email: data.to,
      subject: data.subject,
      message: data.message,
    };

    // Send the POST request to the server
    axios
      .post(
        RAPIDHIRE_ENDPOINT + "/mail",
        mailData
      )
      .then((response) => {
        // The code inside this block will only run if the request is successful
        toast.success("Email sent successfully!");
      })
      .catch((error) => {
        // The code inside this block will run if there's an error with the request
        console.error("Error sending email:", error);
        toast.error("Error sending email.");
      });

    closeModal();
  };

  const openCandidateDetails = (id) => {
    // setSelectedCandidateId(id)
    // setCandidateDetailsDialogOpen(true)
  }

  const handleCandidateDetailsDialogClose = () => {
    // setCandidateDetailsDialogOpen(false)
  }
  return (
    <div className="text-secondary  border rounded-lg" style={{ marginLeft: '120px' }}>
      <table className="border-[1px] rounded-lg overflow-hidden" style={{ minWidth: '1280px', minHeight:'700px' }}>
        {/* Head */}
        <thead className="bg-[#0C1C4D] text-white text-left">
          <tr>
            <th className="px-3 py-3 text-center">S.No</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Job Title</th>
            <th className="px-6 py-3">Job Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates && candidates.length ? candidates.map((candidate, index) => (
            <tr
              height={'100px'}
              key={candidate._id}
              className="hover:bg-gray-100 transition-colors divide-y-[1px] divide-gray-400 duration-300"
            >
              <td className="px-4 py-4">
                <p className="font-semibold text-gray-800 divide-y-[1px]">{index + 1}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={candidate?.imageData ? candidate.imageData : candidateImage}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {candidate.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {candidate.location}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    {candidate.jobTitle}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-500">{candidate.location}</p>
                  {candidate?.stage ? (
                    <>
                      <p className="text-sm text-gray-500">
                        at <span className="font-bold">{candidate.stage}</span>{" "}
                        Stage
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      at <span className="font-bold">Applied</span> Stage
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {(() => {
                      const timestamp = candidate.date;
                      const dateTime = new Date(timestamp);

                      const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      };
                      return dateTime.toLocaleDateString(undefined, options);
                    })()}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <Link to={`profile/${candidate._id}`}>
                    <HiInformationCircle
                      size={25}
                      title="Show Details"
                      className="cursor-pointer mt-2"
                      onClick={() => openCandidateDetails(candidate._id)}
                    />
                  </Link>
                  <AiFillDelete
                    onClick={() => handleDelete(candidate._id)}
                    size={25}
                    color="red"
                    className="cursor-pointer hover:text-red-800 mt-2"
                    title="Delete This User"
                  />
                  <HiMail
                    onClick={(candidate) => openModal(candidate._id)}
                    size={25}
                    className="text-sky-800 hover:text-lime-800 cursor-pointer mt-2"
                    title="Send Mail"
                  />
                  <HiChat
                    onClick={(candidate) => openMessageModal(candidate._id)}
                    size={25}
                    title="Message"
                    className="text-sky-800 cursor-pointer mt-2"
                  />
                  <HiHand
                    size={25}
                    color="red"
                    title="Disqualify"
                    className="cursor-pointer mt-2"
                  />
                  <Link to={`profile/${candidate._id}`}>
                    <button className="bg-[#0C1C4D] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                      Move
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5}>
                <div className="px-10 py-10 flex flex-col items-center">
                  <img className="" src="https://i.ibb.co/Jp5jrt5/applied.png" alt="" />
                  <h6 className="text-swift text-base pt-3 font-medium">
                    No candidates exist
                  </h6>
                </div>
              </td>

            </tr>
          )}
        </tbody>
      </table>
      {/* {!isChecked ? (
        " "
      ) : (
        <>
          <div className="mt-5 mb-3 fixed bottom-0 left-0 right-0 bg-green-200 py-3">
            <div className="space-y-2 pt-4 text-start">
              <div className="flex gap-5 justify-around items-center">
                <div className="flex gap-3 ">
                  <Link to={`profile/${candidate._id}`}>
                    <button className="bg-[#0C1C4D] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                      Show Details
                    </button>
                  </Link>
                  <button
                    onClick={handleUnSelectAll}
                    className="bg-[#0C1C4D] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Unselect All
                  </button>
                </div>
                <div className="flex gap-3">
                  <AiFillDelete
                    onClick={() => handleDelete(selectedCandidateId)}
                    size={25}
                    color="red"
                    className="cursor-pointer hover:text-red-800 mt-2"
                    title="Delete This User"
                  />
                  <HiMail
                    onClick={openModal}
                    size={25}
                    className="text-sky-800 hover:text-lime-800 cursor-pointer mt-2"
                    title="Send Mail"
                  />
                  <HiChat
                    onClick={openMessageModal}
                    size={25}
                    title="Message"
                    className="text-sky-800 cursor-pointer mt-2"
                  />
                  <HiHand
                    size={25}
                    color="red"
                    title="Disqualify"
                    className="cursor-pointer mt-2"
                  />
                  <Link to={`profile/${selectedCandidateId}`}>
                    <button className="bg-[#0C1C4D] text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                      Move to Other Stage
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <SendMailModal
            value={selectedCandidateId}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={onSubmit}
          />
          <SendMessageModal
            value={selectedCandidateId}
            isOpen={messageModalOpen}
            onClose={closeMessageModal}
            onSubmit={onSubmit}
          ></SendMessageModal>
        </>
      )} */}
    </div>
  );
};

export default CandidateTables;
