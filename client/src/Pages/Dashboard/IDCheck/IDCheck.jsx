import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HashLoader } from 'react-spinners';
import { Button } from '@mui/material';
// import { toast } from "react-hot-toast";
// import { createCandidate } from "../../../redux/candidates/candidatesSlice";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { evaluateReport } from "../../../redux/candidates/candidatesSlice";
// import { testData } from "../../../../../datadump/testData";

const IDCheck = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isReportLoader, setReportLoader] = useState(false)
  const [isReport, setReport] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(97);
  const { report } = useSelector((state) => state.candidates);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setReportLoader(true)
    const candidateData = {
      email: data.candidateEmail,
      fullName: data.candidateName,
      phoneNumber: data.candidatePhone,
    };
    await dispatch(evaluateReport(candidateData))
    setReportLoader(false)
    setReport(true)
  };

  const onReset = async (data) => {
    console.log(data);    
    setReport(false)
    document.getElementById("candidate-form").reset();
  }; 
  /*
    const onSubmit = async (data) => {
      for (var i = 0; i < testData.length; i++) {
        const candidateData = testData[i];
        try {
          await dispatch(createCandidate(candidateData));
          toast.success("Successfully post your candidate !");
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
    };
    */

  const handleInputChange = async () => {
    setReport(false)
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1440) {
        setZoomLevel(100);
      } else if (width > 1024) {
        setZoomLevel(97);
      } else if (width > 768) {
        setZoomLevel(95);
      } else {
        setZoomLevel(100);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set the initial zoom level

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pt-10 mb-5" >
      <div className="bg-slate-100  max-w-7xl container mx-auto shadow-lg">
        <h3 className="text-2xl mt-10 mb-2 font-bold text-center text-swift">
          Identity Verification Tool
        </h3>
        <div className="flex flex-col lg:flex-row p-4 gap-5">
            <form
              className="bg-white text-gray-500 p-4 w-full lg:w-1/3"
              onSubmit={handleSubmit(onSubmit)} id="candidate-form">
              <p className="pb-5 font-bold text-center">
                  Please provide the candidate details that you need to be verified, and I will help you with the process.</p>
              <div className="mb-4">
                <input
                  type="text"
                  id="candidateName"
                  placeholder="Name"
                  className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition duration-300 ${errors.candidateName ? "border-red-500" : ""
                    }`}
                  {...register("candidateName", { required: true })}
                  onChange={handleInputChange}
                />
                {/* {errors.candidateName && (
                  <span className="text-red-500">Candidate Name is required</span>
                )} */}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="candidateEmail"
                  placeholder="Email"
                  className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition duration-300 ${errors.candidateEmail ? "border-red-500" : ""
                    }`}
                  {...register("candidateEmail", { required: true })}
                  onChange={handleInputChange}
                />
                {/* {errors.candidateEmail && (
                  <span className="text-red-500">Candidate Email is required</span>
                )} */}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="candidatePhone"
                  placeholder="Phone"
                  className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-300 transition duration-300 ${errors.candidatePhone ? "border-red-500" : ""
                    }`}
                  {...register("candidatePhone", { required: true })}
                  onChange={handleInputChange}
                />
                {/* {errors.candidatePhone && (
                  <span className="text-red-500">Candidate Phone is required</span>
                )} */}
              </div>
              <div className="flex justify-end gap-5">
                <button
                  className="bg-white-500 ring-2 ring-orange-500 text-orange-500 hover:text-white border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 hover:ring-2 hover:bg-orange-500 hover:ring-orange-300 transition duration-300"
                  onClick={handleSubmit(onSubmit)}
                  autoFocus
                >
                  Check Now
                  <TaskAltIcon fontSize="small" style={{ paddingLeft: '3px' }} />
                </button>
                <button
                  className="bg-white-500 ring-2 ring-blue-500 text-blue-500 hover:text-white border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 hover:ring-2 hover:bg-blue-500 hover:ring-blue-300 transition duration-300"
                  onClick={handleSubmit(onReset)}
                  autoFocus
                >
                  Reset
                  <RestartAltIcon fontSize="medium" style={{ paddingLeft: '3px' }} />
                  {/* <TaskAltIcon fontSize="small" style={{ paddingLeft: '3px' }} /> */}
                </button>
              </div>
            </form>

            <div className="flex-1">
              {isReportLoader ? (
                <div className="flex justify-center items-center flex-col" style={{ minHeight: '700px' }}>
                  <div className="w-12/12 flex-col">
                    <HashLoader
                      color="#0C1C4D"
                      cssOverride={null}
                      loading
                      size={50}
                      speedMultiplier={1}
                    />
                  </div>
                  <h2 className="mt-5 text-orange-500">
                    Performing Identify Verification Now...
                  </h2>
                </div>
              ) : ""}
              {isReport &&
                <iframe
                  src={`${report.url}#toolbar=0&zoom=${zoomLevel}`}
                  title="Evaluated Resume"
                  style={{ width: "100%", height: "700px" }}
                />}
                {!isReport &&
                 <div className="flex items-center justify-center" style={{ width: "100%", height: "700px" }}>
                     <p className="font-bold text-center mx-auto text-orange-500" >ID verfication report will be displayed here.</p> 
                 </div>
                }

            </div>
          </div>
      </div>
    </div>
  );
};

export default IDCheck;
