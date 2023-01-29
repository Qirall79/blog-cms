import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <div className="border flex-col h-80 p-10">
      <h3 className="text-xl font-medium mb-10">{props.post.title}</h3>
      <p>{props.post.content}</p>
      <Link to={"/posts/" + props.post._id}>Read More</Link>
    </div>
  );
};

export default Post;
