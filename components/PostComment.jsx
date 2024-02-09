import { useState, useContext } from "react";
import { postCommentToArticleById } from "../api";
import { UserContext } from "../contexts/user";

function PostComment({ articleId, onCommentPosted }) {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [commentStatus, setCommentStatus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [postedComment, setPostedComment] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);
  
    if (!comment.trim()) {
      setCommentStatus("empty");
      setButtonDisabled(false);
      return;
    }
  
    try {
      if (user && user.username === 'tickle122') {
        const newComment = await postCommentToArticleById(articleId, {
          author: user.username,
          body: comment,
          votes: 0,
        });
        setPostedComment(newComment); 
        setComment("");
        setCommentStatus("posted");
        onCommentPosted();
      } else {
        throw new Error("You are not authorized to post comments.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      setCommentStatus("error");
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        {commentStatus === "posted" && (
          <p className="alert alert-success">Comment successfully posted</p>
        )}
        {commentStatus === "error" && (
          <p className="alert alert-danger">Failed to post comment</p>
        )}
        {commentStatus === "empty" && (
          <p className="alert alert-warning">Please enter a comment</p>
        )}
        {postedComment && (
          <div className="alert alert-info">
            <p>New comment:</p>
            <p>{postedComment.body}</p>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="comment-body" className="form-label">
            Add your comment:
          </label>
          <textarea
            className="form-control"
            name="body"
            id="comment-body"
            cols="80"
            rows="10"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="..."
            required
            style={{ backgroundColor: "#212529", color: "white" }} 
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={buttonDisabled}
          style={{ backgroundColor: "#008b00", borderColor: "#008b00" }} 
        >
          {buttonDisabled ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}

export default PostComment;
