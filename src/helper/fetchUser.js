import axios from "axios";

const fetchUser = (user, setUser) => {
  axios
    .get("http://localhost:5000/user", {
      headers: {
        Authorization: localStorage.getItem("token"),
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
