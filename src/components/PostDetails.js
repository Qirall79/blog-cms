import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import Comment from "./Comment";

const PostDetails = (props) => {
  const [post, setPost] = useState({ details: {}, comments: {} });
  const [response, setResponse] = useState({ success: true });
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
  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!response.success ? (
        <h3>Post not found</h3>
      ) : !post.details._id ? (
        ""
      ) : (
        <div id="post-detail">
          <Navbar />
          <h2>{post.details.title}</h2>
          <p>{post.details.content}</p>
          <h4>Author: {post.details.author.first_name}</h4>
          <h4>Timestamp: {post.details.timestamp}</h4>

          <hr />

          <h2>Comments</h2>
          <div>
            {post.comments.length
              ? post.comments.map((comment) => {
                  return <Comment comment={comment} />;
                })
              : "There are no comments for this post"}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
