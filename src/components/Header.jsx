import { useState } from "react";
import { Link, useLocation} from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isClick = (path) => {
    return location.pathname === path ? "text-blue-500" : "focus:text-blue-400";
  }
  

  return (
    <header className="bg-gray-900 text-white border-b shadow-inner border-gray-500 sticky top-0 z-50">
      <nav className="relative max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">MyPortfolio</h1>
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-blue-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-300 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-300 transition">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-300 transition">
              Contact
            </Link>
          </li>
        </ul>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="absolute md:hidden bg-gray-900 pb-4 right-0 left-0 h-screen">
          <ul className="flex flex-col space-y-3 text-sm font-medium">
            <li>
              <Link
                to="/"
                className={`${isClick('/')} block hover:text-blue-300 px-4 py-4 border-b border-t-2 border-gray-500  text-center text-lg`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${isClick('/about')} block hover:text-blue-300 px-4 py-4 border-b border-gray-500  text-center text-lg`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`${isClick('/projects')} block hover:text-blue-300 px-4 py-4 border-b border-gray-500  text-center text-lg`}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${isClick('/contact')} block hover:text-blue-300 px-4 py-4 border-b border-gray-500  text-center text-lg`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
