import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const url = "https://user-management-dashboard-backend.onrender.com/users";

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`url/?page=${page}&limit=${pageSize}`);
      const data = await response.json();
      setUsers(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
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
          console.log(users)
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
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
};

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
      <div style={{ marginTop: "20px" }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            fontWeight: currentPage === index + 1 ? "bold" : "normal",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
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