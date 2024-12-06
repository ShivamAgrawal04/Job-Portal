import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import icons from react-icons
import { Link } from "react-router-dom"; // Import Link from React Router for internal links

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            &copy; 2024 YourCompany. All rights reserved.
          </p>
        </div>
        {/* <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/privacy-policy" className="text-sm hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-sm hover:text-gray-400">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-sm hover:text-gray-400">
            Contact
          </Link>
        </div> */}
        <div className="flex space-x-4">
          {/* External links for social media */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} /> {/* GitHub icon from react-icons */}
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter size={24} /> {/* Twitter icon from react-icons */}
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedin size={24} /> {/* LinkedIn icon from react-icons */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
