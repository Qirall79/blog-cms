import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Post from "./components/Post";
import Navbar from "./components/Navbar";

import url from "./apiLink";

function App() {
  const [posts, setPosts] = useState({
    success: false,
    posts: [],
    fetched: false,
  });

  const fetchPosts = async () => {
    axios
      .get(url + "/posts")
      .then((response) => {
        setPosts({
          success: response.data.success,
          posts: response.data.posts,
          fetched: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getPosts = async () => {
      await fetchPosts();
    };
    getPosts();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <div
        id="posts"
        className="w-full px-20 md:px-28 lg:px-48 py-24 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-16"
      >
        {posts.fetched
          ? posts.posts.length
            ? posts.posts.map((post) => {
                return <Post post={post} />;
              })
            : "There are no posts."
          : "Please wait..."}
      </div>
    </div>
  );
}

export default App;
