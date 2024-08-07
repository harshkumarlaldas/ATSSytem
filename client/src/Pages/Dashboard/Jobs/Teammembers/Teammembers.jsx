import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { HiMiniQuestionMarkCircle, HiUserCircle } from "react-icons/hi2";
import { authContext } from "../../../../Auth/AuthProvider.jsx";
const Teammembers = () => {
  const { user } = useContext(authContext);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch("/Jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [jobs]);
  console.log(jobs);
  return (
    <div className="pt-60 w-11/12 mx-auto">
      <div className="flex gap-1 items-center">
        <h3 className="text-xl font-semibold">Team members</h3>
        <HiMiniQuestionMarkCircle className="w-5 h-5" color="gray" />
      </div>
      {/* Team member */}
      <div className="py-7">
        {jobs.map((job) => (
          <div key={job._id} className="lg:md:flex  items-center justify-between">
            <div className="flex gap-2 items-center">
              {user?.photoURL ? (
                <img src={user.photoURL} className="lg:md:w-10 w-6 lg:md:h-10 h-6 rounded-full" alt="User's photo" />
              ) : (
                <HiUserCircle size={26}/>
              )}

              <p className="font-semibold">{job?.name}</p>
            </div>
            <p>{job?.userEmail}</p>
            <p className="text-gray-500">You're a Super Admin for this job</p>
          </div>
        ))}
      </div>
      <div className="pb-4 space-y-2">
        <h6 className="text-gray-500 font-semibold text-sm">OTHER MEMBERS</h6>
        <p className="text-gray-500 text-sm">
          You can add other account members to your team or invite people to
          join Workable to collaborate on this job.
        </p>
      </div>
      <div className="flex justify-end">
        <button className="border border-orange-500 px-5 hover:bg-orange-500 hover:border-orange-500 hover:text-white py-2 rounded-md text-second hover:text-switch font-medium ">
          Invite a new member
        </button>
      </div>{" "}
    </div>
  );
};

export default Teammembers;
