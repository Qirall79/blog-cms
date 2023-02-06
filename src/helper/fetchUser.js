import axios from "axios";
import url from "../apiLink";

const fetchUser = async (user, setUser) => {
  if (localStorage.getItem("token") == null) {
    setUser({ isAuthenticated: false, userDetails: null });
    return;
  }

  axios
    .get(url + "/user", {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    })
    .then((response) => {
      if (response.data.success) {
        setUser({
          isAuthenticated: true,
          userDetails: response.data.user,
        });
      } else {
        setUser({
          isAuthenticated: false,
          userDetails: response.data.user,
        });
      }
    })
    .catch((err) => {
      setUser({
        isAuthenticated: false,
        userDetails: null,
      });
    });
};

export default fetchUser;
