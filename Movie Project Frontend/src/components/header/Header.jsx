import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4">
        <FontAwesomeIcon icon={faVideoSlash} className="text-yellow-400 text-2xl" />
        <NavLink to="/" className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors">
          MovieGold
        </NavLink>
      </div>
      <nav className="flex items-center space-x-6">
        <NavLink to="/" className="text-lg text-gray-300 hover:text-white transition-colors">
          Home
        </NavLink>
        <NavLink to="/watchlist" className="text-lg text-gray-300 hover:text-white transition-colors">
          Watchlist
        </NavLink>
      </nav>
      <div>
        <button className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
          Login
        </button>
        <button className="ml-4 bg-transparent border border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
          Register
        </button>
      </div>
    </header>
  );
};

export default Header;

