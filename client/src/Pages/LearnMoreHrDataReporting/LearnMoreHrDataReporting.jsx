import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { GrDatabase } from 'react-icons/gr';
import { BiPieChartAlt2, BiMobileAlt } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md';

const LearnMoreHrDataReporting = () => {
  return (
    <div className="bg-green-100">
      <div className="md:px-20 px-4 ">
        <div className="text-center text-swift py-20">
          <h2 className="text-[48px] font-bold">HR Data & Reporting</h2>
          <p className="text-[21px] text-second my-5">
            Manage all your people data in a secure, organized HR database,
            and gather insights that lead to strategic action.
          </p>
        </div>
        <div className="md:grid grid-cols-2 items-center md:gap-10 ">
          <div>
            <h2 className="text-[#404347] text-[26px] font-bold">
              Simplify data management and make data-driven decisions.
            </h2>
            <p className="text-[#404347] text-[18px] my-8">
              Data upkeep and uncovering insights about your people don’t have
              to be stressful and time-consuming. With our secure, central
              database, entering and leveraging HR data has never been easier.
              And with 49 built-in reports, you can use that data to take
              action and make meaningful changes at your organization.
            </p>

            <Link to="/demo-page">
              <button className="bg-[#0C1C4D]-700 text-white font-bold px-6 py-2 rounded-md hover:bg-orange-500 transition ease-out duration-300">
                Get my free demo
              </button>
            </Link>
          </div>
          <div>
            <img src="https://i.ibb.co/gDTTx63/simpplify-Data.webp" alt="" />
          </div>
        </div>

        {/* Explore HR Data & Reporting with RapidHire  cards---------------------------------------------------- */}
        <div className="text-center mt-40 mb-10 text-swift text-[36px] font-bold">
          <h2>Explore HR Data & Reporting with RapidHire</h2>
        </div>
        <div className="md:flex justify-between gap-8">
          {/* card1*/}
          <div className="card md:w-96 w-80 mx-auto mb-3 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex">
                <FaRegUser className="text-4xl"></FaRegUser>
                <GrDatabase className="-ms-1 text-2xl mt-3"></GrDatabase>
              </div>
              <h2 className="card-title my-2">Secure Employee Database</h2>
              <p className="text-second">
                Our database provides a safe and easy way to track and report
                on sensitive employee data.
              </p>
              <span className="text-gray-700  card-title flex  items-center gap-3 my-2">
                Explore Employee Database{" "}
                <MdArrowForwardIos></MdArrowForwardIos>
              </span>
            </div>
          </div>
          {/* card2 */}
          <div className="card md:w-96 w-80 mx-auto mb-3 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex">
                <BiPieChartAlt2 className="text-4xl"></BiPieChartAlt2>
              </div>
              <h2 className="card-title my-2">Automated Reporting</h2>
              <p className="text-second">
                Make strategic, informed decisions with 49 built-in reports
                you can generate instantly.
              </p>
              <span className="card-title flex items-center gap-3 text-gray-700  my-2">
                Explore Reporting <MdArrowForwardIos></MdArrowForwardIos>
              </span>
            </div>
          </div>
          {/* card3 */}
          <div className="card md:w-96 w-80 mx-auto mb-3 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex">
                <BiMobileAlt className="text-4xl"></BiMobileAlt>
              </div>
              <h2 className="card-title my-2">Mobile App</h2>
              <p>
                Give everyone access to essential HR functions on-the-go with
                the BambooHR® Mobile app.
              </p>
              <span className="card-title flex items-center gap-3  text-gray-700 my-2">
                Explore the Mobile App <MdArrowForwardIos></MdArrowForwardIos>
              </span>
            </div>
          </div>
        </div>
        {/* ---------------------------------------------------------------- */}

        {/* End image section--------------------- */}
        <div className="md:grid grid-cols-[650px_minmax(0,_1fr)] gap-10 items-center mt-20 ">
          <div>
            <p className="text-[1.625rem] text-second">
              "[BambooHR’s] reporting suite in particular is pretty
              impressive. When I've looked at other reporting suites and other
              systems, you've either got to build additional modules or
              something, but the reporting that comes already built in is
              really, really good. We use that on a daily basis as a
              business."
            </p>
            <p className="mt-10 text-swift font-bold text-[1rem]">
              KIRSTY MCDAID, PEOPLE SYSTEMS AND ANALYTICS LEAD, END
            </p>
          </div>

          <div>
            <img src="https://i.ibb.co/FBgZBQv/end.webp" alt="" />
          </div>
        </div>
        {/* ---------------------------------------- */}

        {/*  Additional Resources  card---------------------------------*/}
        <div className="mt-32">
          <h2 className="text-center text-swift text-[36px] font-bold">
            Additional Resources
          </h2>
          <p className="text-center text-second text-[21px] mt-4">
            Tap into the strategic power of HR data and analytics.
          </p>
          <div className="md:flex justify-between gap-8 mt-20 ">
            {/* card1 */}
            <div className="card md:w-96 w-80 mx-auto mb-3 glass">
              <figure>
                <img src="https://i.ibb.co/SVYzmyq/Additional-Resources1.webp" alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  When One Does the Work of Three: How to Fix Inefficient
                  Payroll Processes
                </h2>
                <p>
                  All the need-to-know rules and regulations to organize and
                  maintain employee records and keep your organization in
                  compliance.
                </p>
                <span className="card-title flex items-center gap-3 my-2">
                  Read More <MdArrowForwardIos></MdArrowForwardIos>
                </span>
              </div>
            </div>
            {/* card2 */}
            <div className="card md:w-96 w-80 mx-auto mb-3 glass">
              <figure>
                <img src="https://i.ibb.co/6gcCmyj/Additional-Resources2.webp" alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  What Your Executive Team Wants from HR Reports
                </h2>
                <p>
                  How much do HR reports influence strategy? How often do
                  execs want to see HR reports? Answer those questions and
                  more with this infographic.
                </p>
                <span className="card-title flex items-center gap-3 my-2">
                  Read More <MdArrowForwardIos></MdArrowForwardIos>
                </span>
              </div>
            </div>
            {/* card3 */}
            <div className="card md:w-96 w-80 mx-auto mb-3 glass">
              <figure>
                <img src="https://i.ibb.co/pznTCcG/Additional-Resources3.webp" alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  The Key HR Metrics You Should be Measuring
                </h2>
                <p>
                  Learn the basic HR metrics you should be measuring to make a
                  real impact at your organization.
                </p>
                <span className="card-title flex items-center gap-3 my-2">
                  Read More <MdArrowForwardIos></MdArrowForwardIos>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------------------------- */}

      </div>
    </div>
  );
};

export default LearnMoreHrDataReporting;