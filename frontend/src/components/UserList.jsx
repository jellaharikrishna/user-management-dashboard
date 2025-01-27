import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const url = "https://user-management-dashboard-backend.onrender.com/users";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      try {
        let res = await axios.delete(`${url}/${id}`);
        if (res){
          alert("User Deleted")
          fetchUsers();
        }
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const openForm = (user = null) => {
    setEditUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditUser(null);
    setShowForm(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Button className="mb-3" onClick={() => openForm()}>Add User</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => openForm(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <UserForm
          show={showForm}
          onHide={closeForm}
          user={editUser}
        />
      )}
    </div>
  );
};

export default UserList;














// import React from "react";

// const UserList = ({ users, onEdit, onDelete }) => (
//   <div className="user-list">
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>{user.firstName}</td>
//             <td>{user.lastName}</td>
//             <td>{user.email}</td>
//             <td>{user.department}</td>
//             <td>
//               <button onClick={() => onEdit(user)}>Edit</button>
//               <button onClick={() => onDelete(user.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );


// export default UserList