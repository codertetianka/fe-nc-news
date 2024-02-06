import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import Articles from "../components/Articles";

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlesData = await getAllArticles();
        setArticles(articlesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    loadArticles();
  }, []); 

  return (
    <section>
      <div className="featured-articles">
        <h2>Articles</h2>
        {loading ? (
          <div>Loading articles...</div>
        ) : (
          <Articles articles={articles} />
        )}
      </div>
    </section>
  );
}
