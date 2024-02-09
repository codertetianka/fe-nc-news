import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles } from "../api";
import Articles from "./Articles";

const TopicArticlesPage = () => {
  const { topicId } = useParams();
  const [articles, setArticles] = useState([]);
  const capitalisedTopicId = topicId.charAt(0).toUpperCase() + topicId.slice(1);
  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await getAllArticles();
        const filteredArticles = articlesData.filter(article => article.topic === topicId);
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [topicId]);

  return (
    <div className="page">
      <h1>{capitalisedTopicId} Articles</h1>
      {articles.length > 0 ? (
        <Articles articles={articles} />
      ) : (
        <p>No articles found for this topic.</p>
      )}
    </div>
  );
};

export default TopicArticlesPage;
