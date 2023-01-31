import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PostDetails from "./components/PostDetails";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PostForm from "./components/PostForm";
import Signup from "./components/Signup";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/blog-cms">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts" element={<App />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
