import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchUser from "../helper/fetchUser";

const CommentForm = (props) => {
  const params = useParams();
  const [text, setText] = useState("");
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const updateText = (e) => {
    setText(e.target.value);
  };

  const postComment = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/posts/" + params.postId, { text }, config)
      .then((response) => {
        props.addComment();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form method="post">
        <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
          <label htmlFor="text">Comment</label>
          <input
            type="text"
            name="text"
            id="text"
            className="border  px-2 py-1 text-sm w-3/4"
            onChange={updateText}
          />
        </div>
        <input
          type="submit"
          value="Post"
          className="px-8 py-2 bg-emerald-500 rounded-md cursor-pointer font-medium"
          onClick={postComment}
        />
        <button
          className="px-8 py-2 ml-4 bg-emerald-500 rounded-md cursor-pointer font-medium"
          onClick={props.hideCommentForm}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
