import App from '../App.jsx'
import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
          <nav>
            <ul style={{listStyle:"none"}}>
              <li className="home-link" key="home-button">
                <Link style={{ color: "white",  textDecoration:"underline"}}to="/">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      );
};
export default Layout;