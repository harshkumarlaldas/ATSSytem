import React, { useEffect, useState, useContext } from "react";
import { authContext } from "../../Auth/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { isDemo } from "../../constants";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const { user, logout } = useContext(authContext);
  const location = useLocation();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 200;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 100px Calibri";
    context.fillStyle = '#0C1C4D';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(user?.email.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2);
    setAvatarSrc(canvas.toDataURL("image/png"));
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if ( window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Call the handleScroll function initially to set the initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
  if (location.pathname.startsWith("/overview")) {
    return null;
  }

  return (
    <nav
      className={`navbar fixed z-10 font-bold flex items-center justify-between flex-wrap px-6 
      ${scrolling ? "bg-white bg-opacity-90 text-white shadow-lg" : "bg-[#0C1C4D]-700 text-white"}`}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
      <a href="https://www.rapidhire.ipivot.io/">
        <img
          src="./hk.png"
          className={`w-28 h-15 mr-2  p-2 rounded-full 
          ${scrolling ? "bg-white bg-opacity-80 lg:md:bg-opacity-0 " : "bg-white bg-opacity-80"}`}
          alt="Logo"
        />
       </a> 
        {" "}
        {/* Adjust width and height as needed */}
      </div>

      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-9 w-9 p-2 rounded-full bg-orange-500 bg-opacity-80  ${isOpen ? "hidden" : "block"}`}
            // viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-9 w-9  bg-orange-500 bg-opacity-80 p-2 rounded-full ${isOpen ? "block" : "hidden"}`}
            // viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
          {/* ... (your button code) */}
        </button>
      </div>
      <div
        className={`md:lg:bg-[#0C1C4D] rounded-lg bg-opacity-90 lg:md:bg-opacity-0 ps-4 lg:md:ps-0  pb-5 lg:md:pb-0 w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"
          }`}
      >
        <div className="text-[13px] lg:flex-grow py-2  lg:md:bg-opacity-0 w-40 lg:md:w-100 ">
          <Link
            to="/"
            className={`block mt-4 sm:w-11 lg:inline-block font-bold lg:mt-0 mr-4 ${activeLink === 40 ? "active-link" : ""
              }`}
            style={{ color: scrolling ? "#0C1C4D" : "#f96f1f", }} // Fix the style property syntax
            onClick={() => handleLinkClick(40)} // Set activeLink to 0 on click
          >
            Home
          </Link>
          <Link
            to="/single-pay"
            className={`block mt-4 sm:w-14 lg:inline-block font-bold lg:mt-0 mr-4 ${activeLink === 8 ? "active-link" : ""
              }`}
            style={{ color: scrolling ? "#0C1C4D" : "#f96f1f" }} // Fix the style property syntax
            onClick={() => handleLinkClick(8)} // Set activeLink to 0 on click
          >
            Benefits
          </Link>

          <Link
            to="/hiring"
            className={`block mt-4 sm:w-28 lg:inline-block font-bold lg:mt-0 mr-4 ${activeLink === 2 ? "active-link" : ""
              }`}
            style={{ color: scrolling ? "#0C1C4D" : "#f96f1f" }}
            onClick={() => handleLinkClick(2)} // Set activeLink to 1 on click
          >
            Hiring & Board
          </Link>
          <Link to='/hr-data'

            className={`block mt-4 sm:w-24 lg:inline-block font-bold lg:mt-0 mr-4 ${activeLink === 1 ? "active-link" : ""
              }`}
            style={{ color: scrolling ? "#0C1C4D" : "#f96f1f" }}
            onClick={() => handleLinkClick(1)} // Set activeLink to 1 on click
          >
            Hr Reporting
          </Link>
        </div>
        <div className=" flex-col sm:flex-row justify-start md:lg:flex  items-center">



          {user ? (
            <>
              <div className="flex justify-between">
                <div >
                  <img
                    src={avatarSrc}
                    alt=""
                    className="w-9 h-9 rounded-full mx-3"
                  />
                </div>
                <div>
                  <Link to={isDemo ? "/dashboard/idCheck" : "/dashboard/jobs"}>
                    <button className="px-8 py-2 bg-[#0C1C4D]-700 rounded-md hover:bg-[#0C1C4D]-700 hover:border border hover:border-orange-500 hidden md:block"
                      style={{ color: scrolling ? "#0C1C4D" : "#f96f1f" }}>

                      Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            </>) :
            <div className="flex justify-start  gap-2 items-center">
              <Link
                className={`px-8 py-2  rounded-md md:block"
                ${scrolling ? "bg-[#0C1C4D]-700 hover:bg-[#0C1C4D]-700 border-blue-900 hover:border-orange-500 text-blue-900" : "bg-[#0C1C4D]-700 hover:bg-[#0C1C4D]-700 hover:border border hover:border-orange-500 text-white"}`}
                to={"/login"}
              >
                Login
              </Link>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;