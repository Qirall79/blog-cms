const Comment = ({ comment }) => {
  return (
    <div>
      author: {comment.user.first_name}
      comment: {comment.text}
    </div>
  );
};

export default Comment;
