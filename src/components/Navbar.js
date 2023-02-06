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
    const getUser = async () => {
      await fetchUser(user, setUser);
    };
    getUser();
  }, []);

  if (user.isAuthenticated) {
    return (
      <div className="w-full bg-cyan-700 h-48 flex px-24 lg:px-48 py-10 lg:py-0 flex-col lg:flex-row  items-center justify-between">
        <h1 className=" text-4xl lg:text-5xl font-semibold">Walid's Blog</h1>
        <ul className="flex items-center gap-10 md:gap-20 text-md md:text-lg font-medium">
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
    <div className="w-full bg-cyan-700 h-48 flex px-24 lg:px-48 py-10 lg:py-0 flex-col lg:flex-row  items-center justify-between">
      <h1 className="text-4xl lg:text-5xl font-semibold">Walid's Blog</h1>
      <ul className="flex items-center gap-10 md:gap-20 text-md md:text-lg font-medium">
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
