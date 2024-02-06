import { useEffect, useState } from "react";
import { getCommentsByArticleID } from "../api";
import Card from 'react-bootstrap/Card';

const Comments = ({ articleid }) => {
  const [articleComments, setArticleComments] = useState([]);

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

  return (
    <div className="comments-list">
      {articleComments?.length ? (
        articleComments.map((comment) => (
          <Card key={comment.comment_id} bg="dark" text="white" className="mb-3">
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">{comment.author}</Card.Subtitle>
              <Card.Text>Likes: {comment.votes}</Card.Text>
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
