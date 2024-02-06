import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import Articles from "../components/Articles"

export default function Homepage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlesData = await getAllArticles();
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    loadArticles();
  }, []); 

  return (
    <section>
      <div className="featured-articles">
        <h2>Articles</h2>
       <Articles articles={articles} />
      </div>
    </section>
  );
}
