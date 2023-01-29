import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <div className="border flex-col h-80 p-10 overflow-hidden">
      <h3 className="text-xl font-medium mb-10">{props.post.title}</h3>
      <p className=" overflow-hidden">{props.post.content}</p>
      <Link to={"/posts/" + props.post._id}>Read More</Link>
    </div>
  );
};

export default Post;
