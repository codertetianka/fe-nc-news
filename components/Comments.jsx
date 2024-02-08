import { useEffect, useState, useContext } from "react";
import { getCommentsByArticleID, deleteCommentById } from "../api";
import Card from 'react-bootstrap/Card';
import { Heart } from 'react-bootstrap-icons';
import { UserContext } from "../contexts/user";

const Comments = ({ articleid }) => {
  const [articleComments, setArticleComments] = useState([]);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getCommentsByArticleID(articleid);
        setArticleComments(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [articleid]);

  const isUserAuthorized = (commentAuthor) => {
    return user && user.username === 'tickle122' && user.username === commentAuthor;
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentById(commentId); 
      setArticleComments(articleComments.filter(comment => comment.comment_id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comments-list">
      {articleComments?.length ? (
        articleComments.map((comment) => (
          <Card key={comment.comment_id} bg="dark" text="white" className="mb-3">
            <Card  bg="dark" text="white" className="mb-3">{comment.author}</Card>
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">{comment.author}</Card.Subtitle>
              <Card.Text><Heart /> {comment.votes}</Card.Text>
              {isUserAuthorized(comment.author) && (
                <button onClick={() => handleDeleteComment(comment.comment_id)} className="btn btn-danger" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}>
                  Delete
                </button>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No comments here yet</p>
      )}
    </div>
  );
};

export default Comments;
