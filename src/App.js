import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Post from "./components/Post";
import Navbar from "./components/Navbar";

function App() {
  const [posts, setPosts] = useState({ success: false, posts: [] });

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setPosts({
          success: response.data.success,
          posts: response.data.posts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <div id="posts" className="w-full px-48 py-24 grid grid-cols-4 gap-16">
        {!posts.success
          ? !posts.posts.length
            ? ""
            : "There are no posts here"
          : posts.posts.map((post) => {
              return <Post post={post} />;
            })}
      </div>
    </div>
  );
}

export default App;
