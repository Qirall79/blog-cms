import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchUser from "../helper/fetchUser";

const Navbar = () => {
  // Get current user if exists
  const [user, setUser] = useState({
    isAuthenticated: true,
    userDetails: null,
  });

  useEffect(() => {
    fetchUser(user, setUser);
  }, []);

  if (user.isAuthenticated) {
    return (
      <div className="w-full bg-cyan-700 h-48 flex px-48  items-center justify-between">
        <h1 className="text-5xl font-semibold">Walid's Blog</h1>
        <ul className="flex items-center gap-20 text-lg font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full bg-cyan-700 h-48 flex px-48  items-center justify-between">
      <h1 className="text-5xl font-semibold">Walid's Blog</h1>
      <ul className="flex items-center gap-20 text-lg font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
