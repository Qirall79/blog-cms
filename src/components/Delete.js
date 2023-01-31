import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import url from "../apiLink";

const Delete = (props) => {
  const params = useParams();
  const [deleted, setDeleted] = useState(false);
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const deletePost = (e) => {
    e.preventDefault();
    axios
      .delete(url + "/posts/" + params.postId, config)
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {deleted ? <Navigate replace to="/" /> : ""}
      Are you sure ?
      <div>
        <button
          className="bg-red-500 px-5 py-2 font-medium rounded-md mt-10 mr-5"
          onClick={deletePost}
        >
          Delete
        </button>
        <button
          className="bg-teal-300 px-5 py-2 font-medium rounded-md mt-10 "
          onClick={props.hideDeleteForm}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete;
