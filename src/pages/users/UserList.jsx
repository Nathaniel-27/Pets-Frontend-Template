import { Link } from "react-router-dom"

const UserList = ({users}) => {

  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.firstName + " " + u.lastName} <Link to={"/users/" + u.id}>Edit</Link></li>)}
    </ul>
  )
}

export default UserList