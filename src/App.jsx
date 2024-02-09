import Root from "../routes/root";
import ErrorPage from "../routes/404";
import Header from "../components/Header"
import Homepage from "./Homepage";
import ArticlePage from "../components/ArticlePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from '../contexts/user';
import TopicsPage from "../components/TopicsPage";
import TopicArticlesPage from '../components/TopicArticlesPage';
import TopicCodingPage from '../components/TopicCodingPage';
import TopicCookingPage from '../components/TopicCookingPage';
import TopicFootballPage from '../components/TopicFootballPage';


function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Homepage />} />
            <Route path="/articles/:articleid" element={<ArticlePage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:topicId" element={<TopicArticlesPage />} />
            <Route path="coding" element={<TopicCodingPage />} /> 
            <Route path="football" element={<TopicFootballPage />} /> 
            <Route path="cooking" element={<TopicCookingPage />} /> 

          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;