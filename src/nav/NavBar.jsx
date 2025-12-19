import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    
    return <url className="navbar">
    <li className="navbar-item">
        <Link to="/GameDashboard">My Games</Link>
    </li>
    <li className="navbar-item">
        <Link to="/Welcome">Home</Link>
    </li>
        {localStorage.getItem("honey_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("honey_user")
        navigate("/login", { replace: true })
      }}
    >
      Logout
    </Link>
  </li>
) : (
  ""
)}
</url>
}