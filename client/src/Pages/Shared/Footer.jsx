
import { FaFacebook, FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PopUp from "../../Components/PopUp/PopUp";
import ContactUs from "../../Components/ContactUs/ContactUs";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../../Components/PrivacyPolicy/PrivacyPolicy";
import Branding from "../../Components/Branding/Branding";
import Design from "../../Components/Design/Design";
import AboutUs from "../../Components/AboutUs/AboutUs";

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupWidth, setPopupWidth] = useState(40);
  const [popupHeight, setPopupHeight] = useState(50);

  const togglePopup = (content,width,height) => {
    setShowPopup(!showPopup);
    setPopupContent(content);
    setPopupWidth(width);
    setPopupHeight(height);
  };
  const location = useLocation();
  if (location.pathname.startsWith("/overview")) {
    return null;
  }
  return (
    <div>
      <hr/>
      <footer className="footer ml-20 p-10 bg-[#0C1C4D]-100 bg-opacty-30">
        <div className="flex justify-between  w-5/6">
          <div className="flex flex-col">
            <span className="font-bold text-swift">Services</span>
            <a className="link link-hover" onClick={() => togglePopup(<Branding />,40,50)}>Branding</a>
            <a className="link link-hover" onClick={() => togglePopup(<Design />,60,80)}>Design</a>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-swift">Company</span>
            <a className="link link-hover" onClick={() => togglePopup(<AboutUs />,40,50)}>About us</a>
            <a className="link link-hover" onClick={() => togglePopup(<ContactUs />,70,85)}>Contact</a>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-swift">Legal</span>
            <a className="link link-hover" onClick={() => togglePopup(<TermsAndConditions />,60,80)}>Terms of use</a>
            <a className="link link-hover" onClick={() => togglePopup(<PrivacyPolicy />,60,80)}>Privacy policy</a>
          </div> 
        </div>
      </footer>
      <footer className="footer px-10 text-base-content">
        <div className="items-center grid-flow-col">
          <p className="px-20">
            © 2023 iPivot, LLC. All Rights Reserved. RapidHire ® is a
            registered trademark of iPivot, LLC.
          </p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 text-center">
            <a href="https://github.com/iPivot" target="_blank">
              <FaGithub className="h-8 w-8"></FaGithub>
            </a>
            <a href="https://www.linkedin.com/company/ipivot/" target="_blank">
              <FaLinkedin className="h-8 w-8"></FaLinkedin>
            </a>
          </div>
        </div>
      </footer>
      <PopUp show={showPopup} handleClose={() => setShowPopup(false)} popupWidth={popupWidth} popupHeight={popupHeight}>
        <>{popupContent}</>
      </PopUp>
    </div>
  );
};

export default Footer;
