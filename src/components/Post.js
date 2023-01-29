import { Link } from "react-router-dom";

const Post = (props) => {
  return (
    <div className="border flex flex-col justify-between items-center h-64 p-8 overflow-hidden">
      <h3 className="text-xl font-medium">{props.post.title}</h3>
      <p className=" overflow-hidden">
        {props.post.content.slice(0, 100) + "..."}
      </p>
      <Link
        to={"/posts/" + props.post._id}
        className="bg-teal-400 px-5 py-2 font-medium rounded-md text-sm"
      >
        Read More
      </Link>
    </div>
  );
};

export default Post;
