import { useState, useEffect } from "react";
import { Link} from "react-router";
function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_URL}/articles`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <Link to={`/articles/${article.id}`} className="article-link">
                <h2>{article.title}</h2>
                <p className="article-preview">{article.content.substring(0, 100)}...</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Articles;
