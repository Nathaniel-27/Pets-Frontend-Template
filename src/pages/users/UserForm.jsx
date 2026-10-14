import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../api/users";


const UserForm = ({ onUserSave }) => {

  const params = useParams();
  const userId = params.userId ?? 0;

  const [user, setUser] = useState({ id: 0, firstName: "", lastName: "", email: "", roleId: 2, active: true });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (userId) {
      // If there is a userId, then get the user's info from the API
      getUserById(userId).then(u => setUser(u)).catch(err => console.log(err))
    } else {
      // we are creating a new user, so setUser to defaults
      setUser({ id: 0, firstName: "", lastName: "", email: "", roleId: 2, active: true });
    }
  }, [userId])

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (validate()) {
      setErrors({})
      onUserSave({ ...user, password });
    }
  }

  function validate() {
    let isValid = true;
    setErrors({});

    if (!user.firstName) {
      setErrors(prev => ({ ...prev, firstName: "First name is required" }))
      isValid = false;
    }

    if (!user.lastName) {
      setErrors(prev => ({ ...prev, lastName: "Last name is required" }))
      isValid = false;
    }

    if (!user.email) {
      setErrors(prev => ({ ...prev, email: "Email address is required" }))
      isValid = false;
    } else if (!validateEmailAddress(user.email)) {
      setErrors(prev => ({ ...prev, email: "Email address is not valid" }))
      isValid = false;
    }

    // Password is required when CREATING a user (userId == 0), but optional when EDITING (userId > 0)
    if (userId > 0 && password == "" && confirmPassword == "") {
      // This means that the user is being EDITED and they did NOT change the password
      return isValid;
    } else {
      if (!password) {
        setErrors(prev => ({ ...prev, password: "Password is required" }))
        isValid = false;
      } else if (password !== confirmPassword) {
        setErrors(prev => ({ ...prev, password: "The passwords do not match" }))
        isValid = false;
      } else if (password.length < 8) {
        setErrors(prev => ({ ...prev, password: "The password must be at least 8 characters" }))
        isValid = false;
      }

      // Here's a reminder about what needs to change in the API when EDITING a user and changing their password
      if (userId > 0 && isValid) {
        alert("NOTE: The API is not configured to change a password for PUT requests to /api/users/:id")
      }

    }

    return isValid;
  }

  function validateEmailAddress(email) {
    const regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regExp.test(email);
  }


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input 
          type="text" value={user.firstName} 
          onChange={evt => setUser(prev => ({ ...prev, firstName: evt.target.value }))} />
        {errors.firstName && <div className="validation">{errors.firstName}</div>}
      </div>
      <div>
        <label>Last Name</label>
        <input 
          type="text" 
          value={user.lastName} 
          onChange={evt => setUser(prev => ({ ...prev, lastName: evt.target.value }))} />
        {errors.lastName && <div className="validation">{errors.lastName}</div>}
      </div>
      <div>
        <label>Email</label>
        <input 
          type="text" 
          value={user.email} 
          onChange={evt => setUser(prev => ({ ...prev, email: evt.target.value }))} />
        {errors.email && <div className="validation">{errors.email}</div>}
      </div>
      <div>
        <label>Role</label>
        <select 
          value={user.roleId} 
          onChange={evt => setUser(prev => ({ ...prev, roleId: Number(evt.target.value) }))}>
          <option value={2}>Standar User</option>
          <option value={1}>Admin</option>
        </select>
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={evt => setPassword(evt.target.value)} />
      </div>
      {errors.password && <div className="validation">{errors.password}</div>}
      <div>
        <label>Confirm Password</label>
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={evt => setConfirmPassword(evt.target.value)} />
      </div>
      <div>
        <input 
          type="checkbox" 
          checked={user?.active} 
          onChange={evt => setUser(prev => ({ ...prev, active: evt.target.checked }))} />
        <label>Active</label>
      </div>
      <button>Save</button>
    </form>
  )
}

export default UserForm