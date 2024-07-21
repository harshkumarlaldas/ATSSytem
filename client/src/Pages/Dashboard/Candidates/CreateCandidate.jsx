import React, { useContext, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  educationOptions,
  employmentTypes,
  experienceLevels,
} from "../../../Components/Dashboard/UtilsJobPost/data";

import { useNavigate } from "react-router-dom";
import { createCandidate } from "../../../redux/candidates/candidatesSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authContext } from "../../../Auth/AuthProvider.jsx";

export const CreateCandidate = ({ open, handleClose }) => {
  // const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const countries = ["Select Country", "United States"];
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI',
    'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
    'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resumeData, setResumeData] = useState("");
  const [imageData, setImageData] = useState("");
  const fileChangedHandler = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setResumeData(event.target.result);
    };
    fileReader.readAsDataURL(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    // console.log("data lagbe" ,data);
    const candidateData = {
      email: data.candidateEmail,
      fullName: data.candidateName,
      phoneNumber: data.candidatePhone,
      state: "New Jersey",
      country: "USA",
      city: "Jersey City",
      jobTitle: data.jobTitle,
      educationList: [data.education],
      employmentList: [data.employmentType],
      experienceList: [data.experience],
      jobPosterEmail: user?.email,
      resume: resumeData,
      summary: data.summary,
      date: new Date(),
      yearsOfExperience: data.yearsOfExperience,
      linkedInUrl: data.linkedInUrl,
      skills: data.skills,
    };
    try {
      await dispatch(createCandidate(candidateData));
      handleClose()
      toast.success("Successfully post your candidate !");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className="bg-blue-900 text-white px-4 py-2 font-semibold transition-colors">
        Add Candidate
      </DialogTitle>
      <DialogContent>
        <div className=" w-full mx-auto p-4 bg-[#ffff]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="candidateName"
                  className="block text-lg font-semibold text-gray-600 mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border focus:border-green-400 focus:ring focus:ring-green-200 rounded"
                  placeholder="Name"
                  id="candidateName"
                  name="candidateName"
                  {...register("candidateName", {
                    required: "Candidate Name is required",
                  })}
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="candidateEmail"
                  className="block text-lg font-semibold text-gray-600 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border focus:border-green-400 focus:ring focus:ring-green-200 rounded"
                  placeholder="Email Address"
                  id="candidateEmail"
                  name="candidateEmail"
                  {...register("candidateEmail", {
                    required: "Email is required",
                  })}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="candidatePhone"
                  className="block text-lg font-semibold text-gray-600 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border focus:border-green-400 focus:ring focus:ring-green-200 rounded"
                  placeholder="Phone Number"
                  id="candidatePhone"
                  name="candidatePhone"
                  {...register("candidatePhone", {
                    required: "Phone Number is required",
                  })}
                />
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="location"
                  className="block text-lg font-semibold text-gray-600 mb-2"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  name="location"
                  defaultValue={"United States"}
                  className="w-full p-2 border bg-white focus:border-green-400 focus:ring focus:ring-green-200 rounded"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="state"
                  className="block text-lg font-semibold text-gray-600 mb-2"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  defaultValue={"NJ"}
                  className="w-full p-2 border bg-white focus:border-green-400 focus:ring focus:ring-green-200 rounded"
                >
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="jobTitle"
                  className="block text-lg font-semibold text-gray-600 mb-2"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  className="w-full p-2 border focus:border-green-400 focus:ring focus:ring-green-200 rounded"
                  placeholder="Job Title"
                  {...register("jobTitle", {
                    required: "Job Title is required",
                  })}
                />
              </div>
            </div>
            {/* Other form fields */}
            {/* ... */}
            <div className="mb-4 w-full">
              <label
                htmlFor="summary"
                className="block text-lg font-semibold text-gray-600 mb-2"
              >
                Summary <span className="text-red-500">*</span>
              </label>
              <input type="text"
                id="summary"
                name="summary"
                rows="4"
                className="w-full p-2 border rounded-md"
                {...register("summary", {
                  // required: "Summary is required",
                })}
              />
            </div>
            <div className=" text-gray-700">
              <div className="md:flex justify-between gap-3 my-2">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="employmentType"
                    className="block text-lg font-semibold text-gray-600 mb-2"
                  >
                    Employment Type{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employmentType"
                    {...register("employmentType", {
                      // required: "Employment type is required",
                    })}
                    className={`w-full px-4 py-2 border rounded ${errors.employmentType ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select.....</option>
                    {employmentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.employmentType && (
                    <p className="text-red-500" role="alert">
                      {errors.employmentType.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="experience"
                    className="block text-lg font-semibold text-gray-600 mb-2"
                  >
                    Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="experience"
                    {...register("experience", {
                      // required: "Experience level is required",
                    })}
                    className={`w-full px-4 py-2 border rounded ${errors.experience ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select....</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.experience && (
                    <p className="text-red-500" role="alert">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex justify-between gap-3 my-2">
                <div className="mb-4 w-full">
                  <label
                    htmlFor="education"
                    className="block text-lg font-semibold text-gray-600 mb-2"
                  >
                    Education <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="education"
                    {...register("education", {
                      // required: "Education is required",
                    })}
                    className={`w-full px-4 py-2 border rounded ${errors.education ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select.....</option>
                    {educationOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.education && (
                    <p className="text-red-500" role="alert">
                      {errors.education.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mb-2">
              <label className="block text-lg font-semibold text-gray-600">
                Resume <span className="text-red-500">*</span>
              </label>
              <input type="file" onChange={fileChangedHandler} />
            </div>
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          className="border-[1px] border-[#0C1C4D] text-swift px-4 py-2 rounded-md font-semibold hover:bg-[#F4F4F4] transition-colors"
          onClick={handleSubmit(onSubmit)}
          autoFocus
        >
          Add Candidate
        </button>
        <button
          onClick={handleClose}
          variant="outlined"
          className="border-[1px] border-[#0C1C4D] text-swift px-4 py-2 rounded-md font-semibold hover:bg-[#F4F4F4] transition-colors"
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>

  );
};
