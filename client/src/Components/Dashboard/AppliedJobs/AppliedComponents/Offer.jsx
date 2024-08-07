import  { useContext, useEffect, useState } from "react";
import { authContext } from "../../../../Auth/AuthProvider.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates } from "../../../../redux/candidates/candidatesOperation";
import OfferDetails from "./Applied/OfferDetails";

const Applied = ({id}) => {
  const {user} = useContext(authContext)
  const email = user?.email;
  console.log(email);
  const dispatch = useDispatch()
  // console.log(id);
  const { candidates, isLoading, error } = useSelector((state) => state.candidates);
  // console.log('from sourced', candidates);


const appliedCandi = candidates.filter((c) => c.jobId === id && c.stage === "Offer");
console.log(appliedCandi);

  useEffect(() => {
    // Dispatch the action to fetch candidates based on the selected sorting order
    dispatch(getAllCandidates(email));
  }, [dispatch]);


  return (
    <div>
      <OfferDetails appliedCandi={appliedCandi}  stageName={appliedCandi.length} />
      
    </div>
  );
};

export default Applied;
