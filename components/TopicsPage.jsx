import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="page">
      <h1>Topics</h1>
      <ul>
        {topics.map((topic) => (
          <li className="topics-li" key={topic.slug}>
                  <Link to={`/topics/${topic.slug}`}>{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;
