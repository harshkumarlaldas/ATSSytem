import React from "react";
import { Link } from "react-router-dom";


const BestTalent = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-4 md:px-10 items-center my-6 md:my-16">
      <div className="text-center md:text-left">
        <h3 className="text-swift md:text-2xl font-bold text-xl mb-2">
          Find, hire & onboard the best talent.
        </h3>
        <p className="text-swift font-semibold leading-8 md:mt-2">
          RapidHire is designed to help organizations find, evaluate, hire and
          onboard the right talent as seamlessly and quickly as possible, all
          while enabling a personal touch and creating great first impressions
          along the way.
        </p>
      </div>
      <div className="mt-6 md:mt-0">
        <img
          src="https://i.ibb.co/sHkWYM4/hiring.png"
          className="w-full md:w-2/3 h-auto rounded-2xl"
          alt=""
        />
      </div>
    </div>
  );
};

export default BestTalent;
