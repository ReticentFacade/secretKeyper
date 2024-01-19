import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Accessing user info from localStorage:
  const username = localStorage.getItem("user");
  // const username = user ? user.username : null;

  return (
    <div className="navbar p-4">
      <ul className="ml-20 mr-20 flex items-center">
        <li
          className="mr-auto italic underline pr-10"
          style={{ color: "#16f20b" }}
        >
          <Link to="/">SecretKeyper</Link>
        </li>

        <li className="pr-10">
          <Link to="/about">About</Link>
        </li>
        <li className="pr-10">
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li className="pr-10">
          {username ? <button>{username} ↓</button> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;