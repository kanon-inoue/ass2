import * as React from "react";
import { useNavigate } from "react-router-dom";

// navigation links
export default function Nav() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/")
  }

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/volcanolist">Volcano List</a>
        </li>
        { token !== "" ? (
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}