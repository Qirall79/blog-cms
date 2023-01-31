/* eslint-disable react/style-prop-object */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import url from "../apiLink";

const PostForm = (props) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [response, setResponse] = useState({
    success: true,
    errors: [],
    post: {},
  });

  const sendData = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(url + "/posts", formData, config)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        setResponse({
          success: false,
          errors: err.response.data.errors,
          post: err.response.data.post,
        });
      });
  };

  const sendUpdateData = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios
      .put(url + "/posts/" + props.oldDetails._id, formData, config)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        setResponse({
          success: false,
          errors: err.response.data.errors,
          post: err.response.data.post,
        });
      });
  };
  // Update formData variable each time input is changed
  const updateFormData = (e) => {
    const target = e.target.getAttribute("name");
    const value = e.target.value;
    if (target === "title") {
      setFormData({ ...formData, title: value });
      setResponse({ ...response, post: { ...response.post, title: value } });
    }
    if (target === "content") {
      setFormData({ ...formData, content: value });
      setResponse({ ...response, post: { ...response.post, content: value } });
    }
    return;
  };

  useEffect(() => {
    const fillDetails = () => {
      if (props.update) {
        setFormData(props.oldDetails);
      }
      return;
    };

    fillDetails();
  }, []);

  if (response.success && response.post._id) {
    return (
      <div>
        <Navigate replace to="/" />
        Updated successfully
      </div>
    );
  }

  return (
    <div>
      {props.update ? "" : <Navbar />}
      <div className="w-full px-20 md:px-28 lg:px-48 py-24">
        <form
          method={props.update ? "put" : "post"}
          className="w-full flex-col gap-20"
        >
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="title" className="mr-10 font-medium ">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={updateFormData}
              className="border  px-2 py-1 text-sm w-3/4"
              value={
                props.update
                  ? formData.title
                  : response.success && response.post._id
                  ? ""
                  : response.post.title
              }
            />
          </div>
          <div className="form-group mb-5 w-1/2 min-w-[400px] flex flex-col gap-3 justify-between">
            <label htmlFor="content" className="mr-10 font-medium ">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              onChange={updateFormData}
              className="border  px-2 py-1 text-sm w-3/4"
              cols="50"
              rows="5"
              value={
                props.update
                  ? formData.content
                  : response.success && response.post._id
                  ? ""
                  : response.post.content
              }
            >
              {" "}
            </textarea>
          </div>

          <input
            type="submit"
            value="Post"
            onClick={props.update ? sendUpdateData : sendData}
            className="px-8 py-2 bg-emerald-500 rounded-md cursor-pointer font-medium"
          />
        </form>
        <div className="text-red-500 mt-5">
          {response.success && response.post._id ? (
            <Navigate replace to={"/posts/" + response.post._id} />
          ) : (
            response.errors.map((err) => {
              return <p>- {err.msg}</p>;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PostForm;
