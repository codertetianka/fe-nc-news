import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Root() {
  let location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href={`/`} className="dashboardHome">Home</a>
          </li>
         
          {!location.pathname.startsWith('/login') && <li className="dashboardLink">
            <a href={`/dashboard`}>Login or Register</a>
          </li>}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
