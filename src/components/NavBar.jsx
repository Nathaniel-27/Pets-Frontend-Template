import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../UserContext"

const NavBar = () => {

  const {currentUser} = useContext(UserContext);

  return (
    <nav>
      {currentUser && <span><b>Hello {currentUser.firstName} ({currentUser.role})</b></span>}
      <NavLink to="/">Home</NavLink>
      {" "}
      <NavLink to="/login">{currentUser ? "Log out" : "Log in"}</NavLink>
      {" "}
      { currentUser?.role == "Admin" && <NavLink to="/users">Users</NavLink> }
    </nav>
  )
}

export default NavBar