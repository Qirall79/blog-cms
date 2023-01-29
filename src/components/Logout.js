import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }, []);

  return <Navigate replace to="/login" />;
};

export default Logout;
