import { Link, Outlet, useLocation } from "react-router-dom";

export default function Root() {
  let location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" className="dashboardHome">Home</Link>
          </li>
          {!location.pathname.startsWith('/login') && (
            <>
              <li className="dashboardLink">
                <Link to="/dashboard">Login or Register</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
