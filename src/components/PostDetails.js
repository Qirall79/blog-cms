import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import Navbar from "./Navbar";
import Comment from "./Comment";
import PostForm from "./PostForm";

import fetchUser from "../helper/fetchUser";
import CommentForm from "./CommentForm";
import Delete from "./Delete";

const PostDetails = (props) => {
  const [post, setPost] = useState({ details: {}, comments: {} });
  const [response, setResponse] = useState({ success: true });
  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState(false);
  const [toDelete, setDelete] = useState(false);
  const [user, setUser] = useState({});
  const params = useParams();

  const fetchPost = () => {
    axios
      .get("http://localhost:5000/posts/" + params.postId)
      .then((response) => {
        setResponse(response.data);
        setPost({
          details: response.data.post,
          comments: response.data.comments,
        });
      })
      .catch((err) => console.log(err));
  };
  const showDeleteForm = () => {
    setDelete(true);
  };
  const hideDeleteForm = () => {
    setDelete(false);
  };

  const showCommentForm = () => {
    setComment(true);
  };

  const hideCommentForm = () => {
    setComment(false);
  };

  const showUpdateForm = () => {
    setUpdate(true);
  };

  const addComment = () => {
    setComment(false);
    fetchPost();
  };

  useEffect(() => {
    fetchUser(user, setUser);
    fetchPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      {update ? (
        <PostForm oldDetails={post.details} update={true} />
      ) : !response.success ? (
        <h3>Post not found</h3>
      ) : !post.details._id ? (
        ""
      ) : (
        <div
          id="post-detail"
          className="w-full px-48 py-10 flex flex-col gap-5"
        >
          <div className="w-full p-10 flex flex-col items-center self-center gap-5 text-center">
            <h2 className="text-4xl font-semibold capitalize mb-10">
              {post.details.title}
            </h2>
            <p className="mb-7 text-lg">{post.details.content}</p>
            <h4>
              By:{" "}
              <span className="font-medium capitalize text-cyan-600">
                {post.details.author.first_name +
                  " " +
                  post.details.author.last_name}
              </span>
            </h4>
            <h4>
              Posted:{" "}
              <span className="font-medium">
                {post.details.timestamp_formatted || "27/01/2023"}
              </span>
            </h4>
            <hr />
            {user.isAuthenticated &&
            user.userDetails._id === post.details.author._id ? (
              toDelete ? (
                <Delete hideDeleteForm={hideDeleteForm} />
              ) : (
                <div>
                  <button
                    className="bg-teal-400 px-5 py-2 font-medium rounded-md mt-10 mr-5"
                    onClick={showUpdateForm}
                  >
                    Update Post
                  </button>
                  <button
                    className="bg-red-500 px-5 py-2 font-medium rounded-md mt-10 "
                    onClick={showDeleteForm}
                  >
                    Delete Post
                  </button>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          <br />
          <div className="px-48 flex flex-col gap-8">
            <h2 className="font-semibold text-xl text-cyan-500">Comments</h2>
            <div className="pl-10 flex flex-col gap-10">
              {post.comments.length
                ? post.comments.map((comment) => {
                    return <Comment comment={comment} />;
                  })
                : "There are no comments for this post"}
              {comment ? (
                <CommentForm
                  hideCommentForm={hideCommentForm}
                  addComment={addComment}
                />
              ) : user.isAuthenticated ? (
                <button
                  className="px-8 py-2 bg-emerald-500 rounded-md cursor-pointer font-medium self-start"
                  onClick={showCommentForm}
                >
                  Add comment
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
