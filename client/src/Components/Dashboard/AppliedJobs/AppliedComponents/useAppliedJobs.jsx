import { useEffect, useState } from "react";
import { RAPIDHIRE_ENDPOINT } from "../../../../constants";

const useAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    fetch(RAPIDHIRE_ENDPOINT + "/all-post")
      .then((res) => res.json())
      .then((data) => {
        setAppliedJobs(data);
      })
      .catch((error) =>
        console.error("Error fetching testimonial data:", error)
      );
  }, []);
  return [appliedJobs];
};

export default useAppliedJobs;
