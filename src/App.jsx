import Root from "../routes/root";
import ErrorPage from "../routes/404";
import Header from "../components/Header"
import Homepage from "./Homepage";
import './App.css';
import ArticlePage from "../components/ArticlePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from '../contexts/user';



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
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;