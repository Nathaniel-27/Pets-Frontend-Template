import MainLayout from '../MainLayout'
import { useDocTitle } from '../../customHooks'
import { Routes, Route, NavLink, Outlet, useNavigate } from "react-router-dom";
import UserList from './UserList';
import UserForm from './UserForm';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext"
import { getAllUsers, updateUser, insertUser } from '../../api/users';

const UsersPage = () => {

  useDocTitle("Users");
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([])

  // Make sure that non-admins cannot view this page (they get redirect back to the login page)
  // Note that there is a better way to do this in React
  useEffect(() => {
    if(currentUser && currentUser.role == "Admin"){
      getAllUsers().then(allUsers => setUsers(allUsers)).catch(err => console.log(err))
    }else{
      navigate("/login");
    }
  }, [currentUser])

  
  const handleUserSave = async (savedUser) => {
    try{
      if(savedUser.id > 0){
        await updateUser(savedUser);
        setUsers(users.map(u => u.id === savedUser.id ? savedUser : u)) ;
      }else{
        const newUserId = await insertUser(savedUser);
        savedUser.id = newUserId;
        setUsers(prev => [...users, savedUser])
      }
      navigate("/users");
    }catch(err){
      console.log(err)
    }
  }

  return (
    <MainLayout>
      <h1>Users</h1>
      <NavLink to="/users">All Users</NavLink>
      {" "}
      <NavLink to="/users/add">Add User</NavLink>
      <Routes>
        <Route index element={<UserList users={users} />} />
        <Route path=":userId" element={<UserForm onUserSave={handleUserSave} />} />
        <Route path="add/" element={<UserForm onUserSave={handleUserSave} />} />
      </Routes>
      <Outlet />
    </MainLayout>
  )
}

export default UsersPage