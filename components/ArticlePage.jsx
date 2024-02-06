import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { getCommentsByArticleID } from '../api';
import Comments from '../components/Comments';

function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [comments, setComments] = useState([])
  const navigate = useNavigate();
  const { articleid } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setError(undefined);
        const articleData = await getArticleById(articleid);
        setArticle(articleData);
        const commentsData = await getCommentsByArticleID(articleid);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error)
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleid, loading]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p className="error">An error occurred: {error?.message}</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <article className="container article mt-5">
      <header className="article-header">
        <h2 className="hover-item">{article.title}</h2>
        <p className="text-white">Author: {article.author}</p>
      </header>
      <div className="article-body text-white" dangerouslySetInnerHTML={{ __html: article.body }}></div>
      <img
        onClick={() => {
          navigate(`/articles/${article.article_id}`);
        }}
        src={article.article_img_url}
        alt={article.title}
        className="hover-item img-fluid mt-3"
        role="link"
      />
      <section className="comment-section mt-3 text-white">
        <p>Comments: {article.comment_count}</p>
        <Comments comments={comments} articleid={articleid} />
        <p>Votes: {article.votes}</p>
        <small style={{ color: '#dee2e6' }}>
    Published on: {new Date(article.created_at).toLocaleDateString()} <br />
  </small>
      </section>
    </article>
  );
}

export default ArticlePage;
