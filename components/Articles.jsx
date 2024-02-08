import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Articles = ({ articles }) => {
  return (
    <Container>
      <Row xs={1} md={2} lg={3}>
        {articles?.map((article) => (
          <Col key={article.article_id} style={{ marginBottom: 12 }}>
            <Card 
              border="success"
              bg="dark"
              text="white"
            >
              <Link to={`/articles/${article.article_id}`}>
                <Card.Img variant="top" src={article.article_img_url} alt={article.title} className="article-image" />
              </Link>
              <Card.Body>
                <Link to={`/articles/${article.article_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card.Title>{article.title}</Card.Title>
                </Link>
                <Card.Text>
                  Author: {article.author} <br />
                  Votes: {article.votes} <br />
                  Comments: {article.comment_count} <br />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small style={{ color: '#dee2e6' }}>
                  Published on: {new Date(article.created_at).toLocaleDateString()} <br />
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Articles;
