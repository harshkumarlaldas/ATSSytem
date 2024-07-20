import { CiLocationOn } from "react-icons/ci";
import { BiMessageDetail, BiLogoTwitter, BiLogoLinkedin,BiLogoGithub } from "react-icons/bi";
import { FiFacebook } from "react-icons/fi";
import {
  AiOutlinePhone,
  AiOutlineClockCircle,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";

const ContactCard = () => {
    return (
    <div className="text-second grid md:grid-cols-4 gap-2 px-4">
      {/* Card 01 */}
      <div className="shadow-xl rounded-2xl p-4 transform transition-transform hover:scale-105 duration-300">

        <CiLocationOn  size={50} className="text-orange-800 mb-2" />
        <h3 className="text-2xl font-semibold">Address</h3>
        <p>103 Carnegie Center, Suite 300,</p>
        <p>Princeton, New Jersey, 08540-6235.</p>
        <p>USA</p>
      </div>
      {/* card 02 */}
      <div className="shadow-xl rounded-2xl p-4 transform transition-transform hover:scale-105 duration-300">
        <AiOutlinePhone  size={50} className="text-orange-800 mb-2" />
        <h3 className="text-2xl font-semibold">Office Numbers</h3>
        <p>Phone: (732) 274-2802</p>
        <p>Fax: (732) 647 1231</p>
      </div>
      {/* card 03 */}
      <div className="shadow-xl rounded-2xl p-4 transform transition-transform hover:scale-105 duration-300">
        <AiOutlineClockCircle  size={50} className="text-orange-800 mb-2" />
        <h3 className="text-2xl font-semibold">Office Hours</h3>
        <p>Mon-Fri, 8am-5pm (EST)</p>
      </div>
      {/* card 04 */}
      <div className="shadow-xl rounded-2xl p-4 transform transition-transform hover:scale-105 duration-300">

        <BiMessageDetail size={50} className="text-orange-800 mb-2 text-center" />
        <h3 className="text-2xl font-semibold mb-4">Social</h3>
        <div className="flex gap-2  items-center"> 
          <a href="https://www.linkedin.com/company/ipivot/"><BiLogoLinkedin size={24} /></a>
          <a href="https://github.com/iPivot" target="_blank"><BiLogoGithub size={24} /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
