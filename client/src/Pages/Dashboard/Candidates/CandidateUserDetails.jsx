import "react-tabs/style/react-tabs.css";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { HashLoader } from 'react-spinners'
import { Dialog, DialogContent, Grid, Chip, Stack } from '@mui/material';
import {
  BiDotsHorizontal,
  BiEnvelope,
  BiMessageCheck,
  BiSolidCalendar,
  BiSolidChat,
  BiSolidHandLeft,
  BiSolidHandRight,
  BiSolidHand,
  BiLocationPlus,
  BiPhone,
  BiChevronLeft,
} from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { useEffect, useState } from "react";
import { RAPIDHIRE_ENDPOINT } from '../../../constants.js';
import Loader from "../../../Components/Loader/Loader";
import { PiGraduationCapBold } from "react-icons/pi";
import CandidateStages from "./CandidateStages";
import { evaluateReport } from "../../../redux/candidates/candidatesSlice";

const CandidateUserDetails = () => {
  const { id } = useParams();
  const [isReport, setReport] = useState(false)
  const [isReportLoader, setReportLoader] = useState(false)
  const dispatch = useDispatch();
  const [userDetails2, setUserDetails2] = useState(null);
  const {
    email,
    jobTitle,
    fullName,
    phoneNumber,
    country,
    state,
    resume,
    summary,
    educationList,
    skills,
    yearsOfExperience,
    _id,
  } = userDetails2 || {};
  // const [report, setReport] = useState("");
  const { report } = useSelector((state) => state.candidates);
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState("");
  // time and date fixer
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const generateAvatar = (initials) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    context.fillStyle = '#0C1C4D';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "bold 100px Calibri";
    context.fillStyle = 'white';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initials, canvas.width / 2, canvas.height / 2);
    setAvatarSrc(canvas.toDataURL("image/png"));
  }

  useEffect(() => {
    const api = RAPIDHIRE_ENDPOINT + `/all-applications/${id}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.fullName) {
          const nameArray = data.fullName.split(' ')
          var initials = ""
          for (var i = 0; i < nameArray.length; i++) {
            initials = initials + nameArray[i].charAt(0)
          }
          generateAvatar(initials)
          setUserDetails2(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [id]); // Include 'id' as a dependency in the useEffect dependency array

  if (userDetails2 === null && !report) {
    return <Loader />;
  }

  const generateReportClick = async () => {
    setReportLoader(true)
    if (email && fullName && phoneNumber) {
      await dispatch(evaluateReport({ email: email, fullName: fullName, phoneNumber: phoneNumber }))
      setReportLoader(false)
      setReport(true)
    }
  }

  return (
    <div style={{ paddingTop: "70px" }}>
      <div className="container mx-auto">
        <div className="bg-image  bg-opacity-20 border">
          <div className="flex lg:md:justify-end  p-4">
            <div className="flex justify-around gap-4 cursor-pointer bg-white px-4 items-center border border-slate-400 rounded-lg p-2">
              <Link to={"../../dashboard/candidate"}>
                <BiChevronLeft
                  size={50}
                  className="border-r-2 border-slate-400 pr-2 text-swift"
                ></BiChevronLeft>
              </Link>
              <BiEnvelope
                // onClick={openModal}
                title="Send Mail"
                size={25}
                className="text-swift"
              />
              <BiMessageCheck
                // onClick={openMessageModal}
                size={25}
                title="Send Message "
                className="text-swift"
              />
              <a
                href="https://calendar.google.com/calendar/u/2/r"
                target="_blank"
              >
                <BiSolidCalendar
                  // onClick={openCalenderModal}
                  size={35}
                  title="Set Event"
                  className="border-r-2 border-slate-400 pr-3 text-swift"
                ></BiSolidCalendar>
              </a>

              <BiSolidChat
                // onClick={openCommentsModal}
                size={25}
                className="text-swift"
                title="Chat"
              />

              <div className="flex border-r-2 border-slate-400 pr-8 text-2xl">
                <BiSolidHandRight size={25} className="text-swift" />
                <BiSolidHandLeft size={25} className="text-swift" />
              </div>
              <BiSolidHand
                // onClick={() => handleDisQualified(id)}
                size={25}
                title="Disqualify"
                className="text-red-700"
              ></BiSolidHand>

              <CandidateStages id={id} />
              <button
                className="bg-[#0C1C4D] text-white px-2 py-1 rounded-md hover:bg-opacity-90 transition-colors float-right"
                onClick={generateReportClick}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <div className="mt-5 border border-slate-200 p-5 rounded-lg bg-blue-100">
                  <img
                    className="h-24 w-24 rounded-xl border border-sky-600"
                    src={avatarSrc}
                    style={{ marginLeft: '30%' }}
                    alt=""
                  />
                  <div className="px-5 mt-2" style={{ marginLeft: "10%" }}>
                    <h1 className="flex gap-2 items-center mb-2 font-bold">
                      <FaUserTie size={20} className="text-swift" />
                      {fullName}
                    </h1>
                    {educationList?.map((education, index) => {
                      return (
                        <h2
                          className="flex gap-2 items-center mb-2 font-semibold"
                          key={index}
                        >
                          <PiGraduationCapBold size={20} className="text-swift" />
                          {education}
                        </h2>
                      );
                    })}
                    <h2 className="flex gap-2 items-center mb-2 font-semibold">
                      <BiLocationPlus size={20} className="text-swift" />
                      {state}, {country}
                    </h2>

                    <h2 className="flex gap-2 items-center mb-2 font-semibold">
                      <BiPhone size={20} className="text-swift" />
                      {phoneNumber}
                    </h2>
                    <h2 className="flex gap-2 items-center font-semibold">
                      <BiEnvelope size={20} className="text-swift" />
                      {email}
                    </h2>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <p className="text-swift font-bold text-base mb-3">POSITION</p>
                <div className='bg-orange-600 text-white px-4 py-2 rounded-md font-bold hover:bg-opacity-90 mb-3' style={{ width: "fit-content" }}> {jobTitle?.toUpperCase()} </div>
                <p className="text-swift font-bold text-base mb-3"> SUMMARY </p>
                <p className="w-5/6"> {summary ? summary : 'The candidate did not provide a professional summary'}</p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <p className="text-swift font-bold text-base mb-3"> SKILLS </p>
                {skills && skills.split(',') && skills.split(',').length && skills.split(',').map((skill, index) => (
                  <Chip className='mr-1 mt-1' key={index} color="primary" style={{ backgroundColor: "#0C1C4D" }} label={skill} />)
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} sm={9}>
            <div className="mb-5 border border-slate-100 py-3">
              {/* <p className="text-swift font-bold text-base mb-6 mt-2"> RESUME </p> */}
              <div className="mt-2 flex gap-5">
                <iframe
                  src={"data:application/pdf;base64," + resume + "#toolbar=0&zoom=65"}
                  style={{ height: '700px', width: '50%', float: 'left' }}
                  title="Uploaded Resume"
                />
                {isReportLoader ? (
                  <div className="flex justify-center items-center" style={{ marginLeft: '20%' }}>
                    <div className="flex-col">
                      <HashLoader
                        color="#0C1C4D"
                        cssOverride={null}
                        loading
                        size={50}
                        speedMultiplier={1}
                      />
                      <h2 className="text-orange-500 mt-5" style={{marginLeft:'-100px'}}>
                        Performing Identify Verification Now...
                      </h2>
                    </div>
                  </div>

                ) : ""}
                {isReport &&
                  <iframe
                    src={`${report.url}#toolbar=0&zoom=70`}
                    title="Evaluated Resume"
                    style={{ width: "50%", height: "700px", marginLeft: "10px" }}
                  />}
              </div>

            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CandidateUserDetails;
