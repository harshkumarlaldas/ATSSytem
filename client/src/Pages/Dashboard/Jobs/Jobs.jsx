import React, { useContext, useEffect, useState } from "react";
import triangle from "../../../assets/Image/triangles4-1.svg";
import PostJobs from "./PostJobs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RAPIDHIRE_ENDPOINT } from "../../../constants";
import { getAllPost } from "../../../redux/postJob/postSlice";
import { authContext } from "../../../Auth/AuthProvider";
import { getAllCandidates } from "../../../redux/candidates/candidatesOperation";
import JobsInvitationsCard from "./JobsInvitetionsCard";
import Swal from "sweetalert2";
import LoaderInternal from "../../../Components/LoaderInternal/LoaderInternal";
const Jobs = () => {
  const dispatch = useDispatch();
  const { user } = useContext(authContext);
  const email = user?.email;

  const { candidates, isLoading, error } = useSelector(
    (state) => state.candidates
  );
  // console.log('from jobs', candidates);
  useEffect(() => {
    // Dispatch the action to fetch candidates based on the selected sorting order
    if (!jobs) {
      dispatch(getAllCandidates(email));
    }
  }, [dispatch]);

  const jobs = useSelector((state) => state.posts.jobs);
  const isJobs = jobs.filter((d) => d.userEmail === user?.email);
  const jobTitleFor = isJobs.map((j) => j.jobTitle);
  const mappedTitle = isJobs.map((j) => {
    // const filteredByTitle = candidates.filter(
    //   (c) => c.jobTitle === j.jobTitle && c.jobId === j._id
    // );
    // const interviewCount = filteredByTitle.filter(
    //   (ft) => ft.stage === "Interview"
    // ).length;
    // const sourcedCount = filteredByTitle.filter(
    //   (ft) => ft.stage === "Sourced"
    // ).length;
    // const appliedCount = filteredByTitle.filter(
    //   (ft) => ft.stage === "Applied"
    // ).length;
    // const offerCount = filteredByTitle.filter(
    //   (ft) => ft.stage === "Offer"
    // ).length;
    // const hiredCount = filteredByTitle.filter(
    //   (ft) => ft.stage === "Hired"
    // ).length;
    // const assessmentCount = filteredByTitle.filter(
    //   (ft) => ft.stage === "Assessment"
    // ).length;

    return {
      jobTitleFor: j.jobTitle,
      jobId: j._id,
      Interview: j.interview,
      Sourced: j.source,
      Applied: j.applied,
      Offer: j.offer,
      Hired: j.hired,
      Assessment: j.assessment,
    };
  });

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  // ---------------------------------------job delete ---------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(RAPIDHIRE_ENDPOINT + `/all-post/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your order has been deleted.", "success");
            }
          });
      }
    });
  };

  if (isLoading) {
    return <LoaderInternal></LoaderInternal>;
  }

  return (
    <div className="pt-[70px] max-w-7xl mx-auto">
      <div className="mx-2 mt-5 flex gap-8 border-[1px] rounded-md   border-gray-300 p-6 items-center bg-white justify-between">
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-bold text-second"> Post a job</h2>
          <p className="text-gray-500">
            Get your job listing in front of millions of candidates today. Do
            things faster with a choice of over 700 job description templates,{" "}
            <br />
            and choose to publish on the most popular free and premium job
            boards.
          </p>
          <Link to="post-job">
            <button className="border border-[#0C1C4D]-600 text-orange-500 px-6 py-2 rounded-lg font-medium hover:bg-[#0C1C4D]-600 hover:text-white hover:bg-orange-500 hover:border-[#0C1C4D]-800 transition-colors duration-300">
              Post a Job
            </button>
          </Link>
        </div>
        <div className="w-52 h-40">
          <img src={triangle} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Previous post */}

      <div className="pt-5 lg:md:px-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-swift ml-2">ALL POSTED JOBS</p>
          <p className="text-xs font-bold text-swift uppercase ">
            Showing with candidates Stages
          </p>
        </div>
        <div className="pt-5 pb-5">
          {mappedTitle.map((jobs, index) => (
            <PostJobs handleDelete={handleDelete} jobs={jobs} key={index} />
          ))}
        </div>
        {/* <div className="">
          {mappedTitle.map((jobs) => (
            <PostJobs jobs={jobs} key={jobs._id} />
          ))}
        </div> */}
        <div>
          <div className="flex justify-between pb-5 ml-1">
            <h2 className=" text-xs font-bold text-swift">SUGGESTED ACTIONS</h2>
          </div>
          <JobsInvitationsCard />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
