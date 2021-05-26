import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext"

const Navigation = () => {
  const { user, userDispatch } = useUser()
  return (
    <nav className="container">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home 🏡
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/todos">
            Todos 📋
          </Link>
        </li>
        {!user ? (
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Log in 🔓
            </Link>
          </li>
        ) : (
          <li className="nav-item ms-auto">
            <button
              className="nav-link btn btn-primary text-light"
              onClick={() => userDispatch({ type: "LOGOUT" })}
            >
              Log out 🔐
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
