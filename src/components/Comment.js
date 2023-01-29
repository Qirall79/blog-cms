const Comment = ({ comment }) => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold text-md">{comment.user.first_name}</h4>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
