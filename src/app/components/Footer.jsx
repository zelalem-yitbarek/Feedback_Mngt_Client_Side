import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";
import whitelogo from "../../../public/white-logo.png"

export default function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-500 pb-4">
        {/* Left Section */}
        <div className="flex flex-col items-start">
          <Image src={whitelogo} alt="White Logo" width={120} height={40} />
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" aria-label="Telegram">
            <FaTelegramPlane className="text-xl hover:text-gray-400" />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF className="text-xl hover:text-gray-400" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn className="text-xl hover:text-gray-400" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="text-xl hover:text-gray-400" />
          </a>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center text-sm text-gray-300 mt-4">
        <a href="#" className="hover:text-white">
          Terms and Conditions
        </a>
        <p>2025 Trust Technologies</p>
      </div>
    </footer>
  );
}
