import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../routes/root";
import ErrorPage from "../routes/404";
import Header from "../components/Header"
import Homepage from "./Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Homepage />,
      }
    ],
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
